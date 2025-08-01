"use client";

import { getStockTickerAsync } from "@/lib/features/stocks/stocksSlice";
import { useAppDispatch } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import StockChart from "./_components/StockChart";

// Extend the User type to include guestId
declare module "next-auth" {
  interface User {
    guestId?: number;
  }
}

export default function Home() {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.guestId) {
      const payload = { guestId: session.user.guestId };
      dispatch(getStockTickerAsync(payload));
    }
  }, [status, session, dispatch]);

  return (
    <div className=" border-red-400">
      <StockChart />
    </div>
  );
}
