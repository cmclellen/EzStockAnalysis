import Image from "next/image";
import Navigation from "./Navigation";
import SearchStockInput from "./SearchStockInput";
import { auth } from "../_lib/auth";
import { UserProfileInfo } from "../_lib/types";
import { Session } from "next-auth";

async function Header() {
  const session: Session | null = await auth();

  const user = session?.user;

  const userProfile: UserProfileInfo | null = user
    ? {
        username: user!.name,
        imageUrl: user!.image,
      }
    : null;

  const appName = process.env.NEXT_PUBLIC_APP_NAME!;
  return (
    <div className="bg-primary-container text-on-primary-container shadow">
      <div className="flex items-center justify-between container mx-auto p-2 relative">
        <div className="flex items-center space-x-1">
          <div className="relative size-8">
            <Image src="logo.svg" alt={appName} fill className="object-cover" />
          </div>

          <h1 className="font-font md:text-lg text-md">{appName}</h1>
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
