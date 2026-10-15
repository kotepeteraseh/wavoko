-- Service catalog and client-owned profile, experience, preference, and subscription records.
create table plans(id text primary key, name text, price_usd int, monthly_applications int);
insert into plans values ('starter','Starter',49,20),('growth','Growth',99,50),('premium','Premium',179,100);
create table profiles(id uuid primary key references auth.users on delete cascade, full_name text, email text, phone text, location text, linkedin text, summary text, created_at timestamptz default now());
create table experiences(id bigint generated always as identity primary key, user_id uuid references auth.users on delete cascade, company text, title text, start_date text, end_date text, details text);
create table job_preferences(user_id uuid primary key references auth.users on delete cascade, roles text[], work_style text[], locations text, min_salary text, per_week int);
create table subscriptions(id bigint generated always as identity primary key, user_id uuid references auth.users on delete cascade, plan_id text references plans(id), status text default 'pending', created_at timestamptz default now());

-- Row-level security keeps client records limited to their signed-in owner.
alter table plans enable row level security;
alter table profiles enable row level security;
alter table experiences enable row level security;
alter table job_preferences enable row level security;
alter table subscriptions enable row level security;
create policy "plans readable" on plans for select using (true);
create policy "own profile" on profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "own experiences" on experiences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own prefs" on job_preferences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own subs read" on subscriptions for select using (auth.uid()=user_id);
create policy "own subs insert" on subscriptions for insert with check (auth.uid()=user_id and status='pending');

-- Create a matching profile row whenever Supabase Auth creates a new account.
create function handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into profiles(id,email,full_name) values (new.id,new.email,new.raw_user_meta_data->>'full_name'); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- Private resume storage; each user's files live under a folder named for their auth ID.
insert into storage.buckets(id,name,public) values ('resumes','resumes',false);
create policy "own resume upload" on storage.objects for insert with check (bucket_id='resumes' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "own resume read" on storage.objects for select using (bucket_id='resumes' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "own resume update" on storage.objects for update using (bucket_id='resumes' and (storage.foldername(name))[1]=auth.uid()::text);
