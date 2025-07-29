"use client";

import clsx from "clsx";
import { RefObject, useEffect, useReducer, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useClickOutside } from "../_hooks/useClickOutside";
import { StockTicker } from "../_lib/types";

function reducer(state: any, action: any) {
  if (action.type === "show_trending_stock") {
    return {
      ...state,
      showTrending: true,
    };
  }
  if (action.type === "set_stock") {
    return {
      ...state,
      stock: action.payload,
      showTrending: false,
    };
  }
  throw Error("Unknown action.");
}

type SearchStockInputProps = {
  trendingStock: StockTicker[];
};

function SearchStockInput({ trendingStock }: SearchStockInputProps) {
  const wrapperRef: RefObject<HTMLDivElement | null> = useRef(null);
  useClickOutside(wrapperRef, () => setIsExpanded(false));
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    trendingStock: trendingStock,
    showTrending: true,
  });

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      dispatch({ type: "show_trending_stock" });
      return;
    }

    const controller = new AbortController();
    const fetchStocks = async () => {
      try {
        const res = await fetch(
          `/api/stocks?query=${encodeURIComponent(searchTerm)}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) return;
        const data = await res.json();

        dispatch({ type: "set_stock", payload: data.items });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          dispatch({ type: "show_trending_stock" });
        }
      }
    };

    fetchStocks();
    return () => controller.abort();
  }, [searchTerm]);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={clsx(
          "flex items-center space-x-1 border px-2 py-1 border-on-surface/50 w-xs max-w-60 bg-surface",
          {
            "rounded-full": !isExpanded,
            "rounded-t-xl": isExpanded,
          }
        )}
      >
        <IoIosSearch />
        <input
          onClick={() => setIsExpanded(true)}
          className="text-xs outline-none w-full placeholder:text-on-surface"
          type="text"
          placeholder="Company or stock symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {state.showTrending}
      {isExpanded && (
        <ul className="absolute top-6 w-full left-0 text-sm font-semibold border shadow-lg bg-surface text-on-surface border-on-surface/50 divide-y divide-on-surface/50">
          {state.showTrending && (
            <li className="font-semibold px-2 py-1 text-md italic">Trending</li>
          )}
          {(state.showTrending ? state.trendingStock : state.stock).map(
            (stock: any) => (
              <li key={stock.ticker}>
                <button className="cursor-pointer w-full flex items-center px-2 py-1 text-xs">
                  <div className="w-1/4 text-start">{stock.name}</div>
                  <div className="w-3/4 font-normal text-start truncate">
                    {stock.description}
                  </div>
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchStockInput;
