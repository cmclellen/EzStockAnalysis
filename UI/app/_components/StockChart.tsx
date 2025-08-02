"use client";

import { removeStockTickerAsync } from "@/lib/features/stocks/stocksSlice";
import { getStockTickers, useAppDispatch, useAppSelector } from "@/lib/store";
import { FaTimes } from "react-icons/fa";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stock } from "../_lib/types";
import { useEffect, useState } from "react";
import { getYearToDate } from "../_lib/actions";

function StockPill({ stock, guestId }: { stock: Stock; guestId: number }) {
  const appDispatch = useAppDispatch();
  return (
    <li
      key={stock.ticker}
      className="bg-on-surface text-surface px-1 py-0 rounded-full flex items-center space-x-1 font-semibold"
    >
      <span>{stock.ticker}</span>
      <button
        onClick={() =>
          appDispatch(
            removeStockTickerAsync({
              stockId: stock.stockId,
              guestId: guestId,
            })
          )
        }
      >
        <FaTimes />
      </button>
    </li>
  );
}

function StockPillList({
  stocks,
  guestId,
}: {
  stocks: Stock[];
  guestId: number;
}) {
  return (
    <ul className="flex items-center text-xs space-x-1">
      {stocks &&
        stocks.map((st) => (
          <StockPill key={st.ticker} stock={st} guestId={guestId} />
        ))}
    </ul>
  );
}

type StockChartProps = {
  guestId: number;
};

function StockChart({ guestId }: StockChartProps) {
  const stockTickers = useAppSelector(getStockTickers);
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getYearToDate();
        setServerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <StockPillList stocks={stockTickers} guestId={guestId} />
      <ResponsiveContainer width="100%" height="100%" className="" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={serverData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default StockChart;
