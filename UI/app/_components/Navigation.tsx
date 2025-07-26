"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { UserProfileInfo } from "../_lib/types";

type NavigationProps = {
  //children: React.ReactNode;
  userProfile: UserProfileInfo | null;
};

function Navigation({ userProfile }: NavigationProps) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <HiBars3
        className="sm:hidden"
        onClick={() => setShowMenu((v: boolean) => !v)}
      />

      <ul
        ref={ref}
        className={clsx(
          "sm:space-x-3 text-xs md:text-sm absolute sm:static top-12 left-0 sm:flex flex-col sm:flex-row font-semibold w-full sm:w-auto py-2 sm:py-0 sm:bg-transparent rounded-b shadow-lg sm:shadow-none bg-primary-container z-10",
          {
            hidden: !showMenu,
          }
        )}
      >
        {userProfile && (
          <>
            <li className="">
              <div className="flex items-center justify-center space-x-1">
                <div className="relative size-8 rounded-full border-2 border-on-primary-container/50">
                  <Image
                    src={userProfile!.imageUrl!}
                    alt=""
                    fill
                    sizes="100%"
                    className="object-cover rounded-full aspect-square"
                  ></Image>
                </div>
                <span>{userProfile!.username}</span>
              </div>
            </li>
          </>
        )}
        {!userProfile && (
          <>
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
          </>
        )}
      </ul>
    </>
  );
}

export default Navigation;
