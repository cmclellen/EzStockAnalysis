"use client";

import { getStockTickerAsync } from "@/lib/features/stocks/stocksSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StockChart from "./_components/StockChart";

export default function Home() {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.guestId) {
      const payload = { guestId: session.user.guestId };
      console.log("payload", payload);
      dispatch(getStockTickerAsync(payload));
    }
  }, [status, session, dispatch]);

  return (
    <div className=" border-red-400">
      <StockChart />
    </div>
  );
}
