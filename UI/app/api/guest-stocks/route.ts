import { addStock, getStocksByGuestId } from "@/app/_lib/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const guestId: any = searchParams.get("guestId")!;
  const stockItems = await getStocksByGuestId(guestId);
  const filtered = stockItems.map((item: any) => item.stock.name);

  return new Response(JSON.stringify({ items: filtered }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  await addStock(body.guestId, body.stockId);
  return new Response(null, { status: 204 });
}
