import { getStock } from "@/app/_lib/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")!;
  const filtered = (await getStock(query)).items;

  return new Response(JSON.stringify({ items: filtered }), {
    headers: { "Content-Type": "application/json" },
  });
}
