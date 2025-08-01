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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
  return (
    <>
      <StockPillList stocks={stockTickers} guestId={guestId} />
      <ResponsiveContainer width="100%" height="100%" className="" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={data}
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
