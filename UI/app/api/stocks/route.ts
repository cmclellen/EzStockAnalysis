import { StockTicker } from "@/app/_lib/types";
import { NextRequest } from "next/server";

const stocks: GetStocksResponseData = {
  items: [
    {
      ticker: "NVDA",
      description: "NVIDIA Corporation",
    },
    {
      ticker: "AAPL",
      description: "Apple Inc.",
    },
    {
      ticker: "GOOGL",
      description: "Alphabet Inc.",
    },
    {
      ticker: "MSFT",
      description: "Microsoft Corporation",
    },
  ],
};

type GetStocksResponseData = {
  items: StockTicker[];
};

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")!;
  const filtered = stocks.items.filter((s) =>
    s.ticker.startsWith(query.toUpperCase())
  );

  return new Response(JSON.stringify({ items: filtered }), {
    headers: { "Content-Type": "application/json" },
  });
}
