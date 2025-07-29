'use client';

import clsx from "clsx";
import { RefObject, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useClickOutside } from "../_hooks/useClickOutside";

type SearchStockInputProps = {
  //children: React.ReactNode;
};

function SearchStockInput(_props: SearchStockInputProps) {
  const wrapperRef: RefObject<HTMLDivElement | null> = useRef(null);
  useClickOutside(wrapperRef, () => setIsExpanded(false));
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [stocks, setStocks] = useState<any>([])

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setStocks([]);
      return;
    }

    const controller = new AbortController();
    const fetchStocks = async () => {
      try {
        const res = await fetch(`/api/stocks?query=${encodeURIComponent(searchTerm)}`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        setStocks(data.items);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setStocks([]);
        }
      }
    };

    fetchStocks();
    return () => controller.abort();
  }, [searchTerm])

  return (

    <div ref={wrapperRef} className="relative">
      <div className={clsx("flex items-center space-x-1 border px-2 py-1 border-on-surface/50 w-xs max-w-60 bg-surface", {
        "rounded-full": !isExpanded,
        "rounded-t-xl": isExpanded,
      })}>
        <IoIosSearch />
        <input onClick={_e => setIsExpanded(v => !v)}
          className="text-xs outline-none w-full placeholder:text-on-surface"
          type="text"
          placeholder="Company or stock symbol..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {isExpanded && (
        <ul className="absolute top-6 w-full left-0 text-sm font-semibold border shadow-lg bg-surface text-on-surface border-on-surface/50 divide-y divide-on-surface/50">
          {stocks.map((stock:any) => (<li key={stock.ticker}>
            <button className="cursor-pointer w-full flex items-center px-2 py-1 text-xs"><div className="w-1/4 text-start">{stock.ticker}</div><div className="w-3/4 font-normal text-start">{stock.description}</div></button>
          </li>))}
        </ul>
      )}
    </div>
  );
}

export default SearchStockInput;
