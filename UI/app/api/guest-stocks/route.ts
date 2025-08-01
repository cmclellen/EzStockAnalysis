import { addStock, getStocksByGuestId, removeStock } from "@/app/_lib/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const guestId: any = searchParams.get("guestId")!;
  const stockItems = await getStocksByGuestId(guestId);
  const filtered = stockItems.map((item: any) => item.stock);
  return new Response(JSON.stringify({ items: filtered }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  await addStock(body.guestId, body.stockId);
  return new Response(null, { status: 204 });
}

export async function DELETE(request: NextRequest): Promise<Response> {
  const body = await request.json();
  await removeStock(body.guestId, body.stockId);
  return new Response(null, { status: 204 });
}
