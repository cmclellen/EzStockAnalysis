"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { signOutAction } from "../_lib/actions";
import { UserProfileInfo } from "../_lib/types";
import NavigationUserProfile from "./NavigationUserProfile";

type NavigationProps = {
  userProfile: UserProfileInfo | null;
};

function Navigation({ userProfile }: NavigationProps) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);

  return (
    <>
      <button
        className="sm:hidden"
        onClick={() => setShowMenu((v: boolean) => !v)}
      >
        {!showMenu && <HiBars3 />}
        {showMenu && <HiXMark />}
      </button>

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
              <NavigationUserProfile userProfile={userProfile} />
            </li>
            <li>
              <form action={signOutAction} className="h-full">
                <button className="cursor-pointer h-full w-full">
                  Log Out
                </button>
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
