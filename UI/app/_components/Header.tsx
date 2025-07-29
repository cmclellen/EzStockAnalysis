import Image from "next/image";
import Navigation from "./Navigation";
import SearchStockInput from "./SearchStockInput";
import { auth } from "../_lib/auth";
import { UserProfileInfo } from "../_lib/types";
import { Session } from "next-auth";
import Link from "next/link";

async function getTrendingStock() {
  const data = [
    {
      ticker: "NVDA",
      description: "NVIDIA Corporation",
    },
    {
      ticker: "AAPL",
      description: "Apple Inc.",
    },
    {
      ticker: "GOOGL",
      description: "Alphabet Inc.",
    },
    {
      ticker: "MSFT",
      description: "Microsoft Corporation",
    },
  ];
  return data;
}

async function Header() {
  const session: Session | null = await auth();
  const trendingStock = await getTrendingStock();

  const user = session?.user;

  const userProfile: UserProfileInfo | null = user
    ? {
        username: user!.name,
        imageUrl: user!.image,
      }
    : null;

  const appName = process.env.NEXT_PUBLIC_APP_NAME!;
  return (
    <div className="bg-primary-container text-on-primary-container shadow-lg z-10">
      <div className="flex items-center justify-between container mx-auto p-2 relative">
        <Link href="/" className="flex items-center space-x-1">
          <div className="relative size-8">
            <Image src="logo.svg" alt={appName} fill className="object-cover" />
          </div>

          <h1 className="font-bold italic text-sm lg:text-lg text-md">
            {appName}
          </h1>
        </Link>

        <div className="hidden md:block">
          <SearchStockInput trendingStock={trendingStock} />
        </div>

        <Navigation userProfile={userProfile} />
      </div>
    </div>
  );
}

export default Header;
