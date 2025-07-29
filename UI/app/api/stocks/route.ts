import { StockTicker } from '@/app/_lib/types';
import { NextRequest, NextResponse } from 'next/server';

const stocks: GetStocksResponseData = {
    items: [
        {
            ticker: "NVDA",
            description: "NVIDIA Corporation"
        },
        {
            ticker: "AAPL",
            description: "Apple Inc."
        },
        {
            ticker: "GOOGL",
            description: "Alphabet Inc."
        },
        {
            ticker: "MSFT",
            description: "Microsoft Corporation"
        }
    ]
};

type GetStocksResponseData = {
    items: StockTicker[]
}

export async function GET(_request: NextRequest, _response: NextResponse<GetStocksResponseData>) {
    return new Response(JSON.stringify(stocks), {
        headers: { 'Content-Type': 'application/json' },
    });
}