'use client';

import clsx from "clsx";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const stocks = [{
  ticker: 'NVDA',
  description: "NVIDIA Corporation"
}, {
  ticker: 'AAPL',
  description: "Apple Inc."
},
{
  ticker: 'GOOGL',
  description: "Alphabet Inc."
},
{
  ticker: 'MSFT',
  description: "Microsoft Corporation"
}
];

type SearchStockInputProps = {
  //children: React.ReactNode;
};

function SearchStockInput(_props: SearchStockInputProps) {

  const [isExpanded, setIsExpanded] = useState(false);

  return (

    <div className="relative">
      <div className={clsx("flex items-center space-x-1 border px-2 py-1 border-on-surface/50 w-xs max-w-60 bg-surface", {
        "rounded-full": !isExpanded,
        "rounded-t-xl": isExpanded,
      })}>
        <IoIosSearch />
        <input onClick={e => setIsExpanded(v => !v)}
          className="text-xs outline-none w-full placeholder:text-on-surface"
          type="text"
          placeholder="Company or stock symbol..."
        />
      </div>
      {isExpanded && (
        <ul className="absolute top-6 w-full left-0 text-sm font-semibold border shadow-lg bg-surface text-on-surface border-on-surface/50 divide-y divide-on-surface/50">
          {stocks.map(stock => (<li key={stock.ticker}>
            <button className="cursor-pointer w-full flex items-center px-2 py-1 text-xs"><div className="w-1/4 text-start">{stock.ticker}</div><div className="w-3/4 font-normal text-start">{stock.description}</div></button>
          </li>))}
        </ul>
      )}
    </div>
  );
}

export default SearchStockInput;
