"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import SearchStockInput from "./SearchStockInput";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  return (
    <div className="bg-primary-container text-on-primary-container shadow">
      <div className="flex items-center justify-between container mx-auto p-2 relative">
        <div className="flex items-center space-x-1">
          <div className="relative size-8">
            <Image src="logo.svg" alt="" fill className="object-cover" />
          </div>

          <h1 className="font-font md:text-lg text-md">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
        </div>

        <div className="hidden md:block">
          <SearchStockInput />
        </div>

        <HiBars3
          className="sm:hidden"
          onClick={() => setShowMenu((v: boolean) => !v)}
        />

        <ul
          ref={ref}
          className={clsx(
            "sm:space-x-3 text-xs md:text-sm absolute sm:static top-12 left-0 sm:flex flex-col sm:flex-row font-semibold w-full sm:w-auto py-2 sm:py-0 sm:bg-transparent rounded-b shadow-lg sm:shadow-none bg-primary-container",
            {
              hidden: !showMenu,
            }
          )}
        >
          <li className="">
            <a href="#" className="nav-secure">
              Login
            </a>
          </li>
          <li className="">
            <a href="#" className="nav-secure">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
