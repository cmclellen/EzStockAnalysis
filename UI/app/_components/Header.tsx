import Image from "next/image";
import Navigation from "./Navigation";
import SearchStockInput from "./SearchStockInput";
import { auth } from "../_lib/auth";
import { UserProfileInfo } from "../_lib/types";

async function Header() {
  const session = await auth();
  const userProfile: UserProfileInfo | null = session?.user
    ? {
        username: session!.user!.name,
        imageUrl: session!.user!.image,
      }
    : null;
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

        <Navigation userProfile={userProfile} />
      </div>
    </div>
  );
}

export default Header;
