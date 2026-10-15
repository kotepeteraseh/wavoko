import { createBrowserClient } from "@supabase/ssr";

// Error shown by the local fallback when the required public Supabase settings are absent.
const missingConfigError =
  "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.";

// Keep screens renderable without configuration while making each attempted operation fail explicitly.
const createMissingSupabaseClient = () => {
  const emptyResult = () => ({ data: null, error: new Error(missingConfigError) });

  const queryChain: any = {
    select: () => queryChain,
    eq: () => queryChain,
    order: () => queryChain,
    limit: () => queryChain,
    maybeSingle: async () => emptyResult(),
    single: async () => emptyResult(),
    insert: async () => emptyResult(),
    update: async () => emptyResult(),
    upsert: async () => emptyResult(),
    delete: async () => emptyResult(),
  };

  return {
    auth: {
      signInWithPassword: async () => emptyResult(),
      signUp: async () => emptyResult(),
      getUser: async () => ({ data: { user: null }, error: new Error(missingConfigError) }),
      getSession: async () => ({ data: { session: null }, error: new Error(missingConfigError) }),
      signOut: async () => ({ error: new Error(missingConfigError) }),
    },
    from: () => queryChain,
    storage: {
      from: () => ({
        upload: async () => emptyResult(),
      }),
    },
  };
};

// Use the real browser client only when both public Supabase values are configured.
export const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    : createMissingSupabaseClient();
