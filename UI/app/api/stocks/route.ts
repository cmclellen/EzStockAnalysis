import { getStock } from "@/app/_lib/actions";
import { StockTicker } from "@/app/_lib/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")!;
  const filtered = (await getStock()).items.filter((s) =>
    s.ticker.startsWith(query.toUpperCase())
  );

  return new Response(JSON.stringify({ items: filtered }), {
    headers: { "Content-Type": "application/json" },
  });
}
