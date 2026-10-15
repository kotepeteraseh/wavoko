import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Read-only API: authenticates the caller and returns only their monday.com application rows.
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data } = await sb.auth.getUser(token);
  const email = data.user?.email;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // monday.com filters the board by the authenticated user's email address.
  const query = `query($board:[ID!],$rules:[ItemsQueryRule!]){boards(ids:$board){items_page(limit:100,query_params:{rules:$rules}){items{name created_at column_values{id text}}}}}`;
  const res = await fetch("https://api.monday.com/v2", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: process.env.MONDAY_API_TOKEN!, "API-Version": "2024-10" },
    body: JSON.stringify({
      query,
      variables: { board: [process.env.MONDAY_BOARD_ID], rules: [{ column_id: "client_email", compare_value: [email] }] },
    }),
  });
  const json = await res.json();
  const items = json?.data?.boards?.[0]?.items_page?.items ?? [];
  // Convert monday.com column IDs into the compact shape used by the dashboard.
  const col = (i: any, id: string) => i.column_values.find((c: any) => c.id === id)?.text ?? "";
  const rows = items.map((i: any) => ({ company: i.name, role: col(i, "role"), status: col(i, "status") || "Applied", date: i.created_at?.slice(0, 10) }));
  return NextResponse.json({ rows });
}
