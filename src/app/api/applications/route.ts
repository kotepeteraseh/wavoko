import { NextResponse } from "next/server";

// Client application tracking is disabled while this site is informational.
export async function GET() {
  return NextResponse.json(
    { error: "Application tracking is not available on this informational website." },
    { status: 410 },
  );
}
