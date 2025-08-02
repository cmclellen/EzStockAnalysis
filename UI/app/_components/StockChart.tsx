"use client";

import { removeStockTickerAsync } from "@/lib/features/stocks/stocksSlice";
import { getStocks, useAppDispatch, useAppSelector } from "@/lib/store";
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

const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const CustomTooltip = ({ active, payload, label }) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="custom-tooltip"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="font-semibold text-gray-500 border-b border-gray-400">
            {label}
          </p>

          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          <p className="flex items-center space-x-2 text-sm">
            <p className="font-semibold">{payload[0].name}</p>
            <p className="font-semibold">{payload[0].payload.original}</p>
            <p className="text-red-400 font-semibold">({payload[0].value}%)</p>
          </p>
        </>
      )}
    </div>
  );
};

function StockChart({ guestId }: StockChartProps) {
  const stocks = useAppSelector(getStocks);
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
      <StockPillList stocks={stocks} guestId={guestId} />
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
          <XAxis dataKey="formattedDay" />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          <Legend />
          {stocks.map((stock) => (
            <Line
              key={stock.ticker}
              type="monotone"
              dataKey={stock.ticker}
              stroke="#82ca9d"
            />
          ))}
          {/* <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          /> */}
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default StockChart;
