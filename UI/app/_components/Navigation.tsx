"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { UserProfileInfo } from "../_lib/types";
import { signOutAction } from "../_lib/actions";

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
            <li>
              <div className="flex items-center justify-center space-x-2">
                <div className="relative size-8 rounded-full outline-2 outline-on-primary-container/50 outline-offset-2">
                  <Image
                    src={userProfile!.imageUrl!}
                    alt={userProfile!.username!}
                    fill
                    sizes="100%"
                    className="object-cover rounded-full aspect-square"
                  ></Image>
                </div>
                <span>{userProfile!.username}</span>
              </div>
            </li>
            <li>
              <form action={signOutAction} className="h-full">
                <button className="cursor-pointer h-full">Log Out</button>
              </form>
            </li>
          </>
        )}
        {!userProfile && (
          <>
            <li>
              <a href="/login" className="nav-secure">
                Log In
              </a>
            </li>
            <li>
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
