"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { Stock } from "./types";
import { compareAsc, format } from "date-fns";

const ticker = 1;

export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalityValue = formData.get("nationality");
  if (typeof nationalityValue !== "string") {
    throw new Error("Invalid nationality value");
  }
  const [nationality, countryFlag] = nationalityValue.split("%");

  const updateData = { nationality, countryFlag };

  const user = session.user! as { guestId: number };

  const { error } = await supabase
    .from("guest")
    .update(updateData)
    .eq("id", user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/profile");
}

type GetStocksResponseData = {
  items: Stock[];
};

export async function getTrendingStock(): Promise<GetStocksResponseData> {
  const { data: stockTickers, error } = await supabase
    .from("stock")
    .select("*, stockId:id")
    .range(0, 3);

  if (error) throw new Error("Failed fetching stock tickers");

  return { items: stockTickers };
}

export async function getStock(query: string): Promise<GetStocksResponseData> {
  const { data: stockTickers, error } = await supabase
    .from("stock")
    .select("*, stockId:id")
    .ilike("ticker", `%${query}%`);

  if (error) throw new Error("Failed fetching stock tickers");

  return { items: stockTickers };
}

export async function addStock(
  guestId: number,
  stockId: number
): Promise<void> {
  const { error } = await supabase
    .from("guest-stock")
    .insert([{ guestId, stockId }]);
  if (error) throw error;
}

export async function getStocksByGuestId(guestId: number): Promise<any> {
  const { data, error } = await supabase
    .from("guest-stock")
    .select("*, stock (ticker, stockId:id, color)")
    .eq("guestId", guestId);
  if (error) throw error;
  return data;
}

export async function removeStock(
  guestId: number,
  stockId: number
): Promise<void> {
  const { error } = await supabase
    .from("guest-stock")
    .delete()
    .eq("guestId", guestId)
    .eq("stockId", stockId);
  if (error) throw error;
}

const roundTo = function (num: number, places: number = 2) {
  const factor = 10 ** places;
  const result = Math.round(num * factor) / factor;
  return result;
};

export async function getYearToDate({
  stockIds,
}: {
  stockIds: number[];
}): Promise<any> {
  const { data: stockClosing, error } = await supabase
    .from("stock-closing")
    .select("*, stock(ticker)")
    .in("stockId", stockIds);

  if (error) throw error;

  console.log(stockClosing.slice(0, 4));

  let data = stockClosing!
    .sort((a, b) => compareAsc(a.date, b.date))
    .map((i) => {
      const original = i.closing;
      const formattedDay = format(i.date, "MMM dd, yyyy");
      return {
        formattedDay,
        [i.stock.ticker]: roundTo(original),
        original,
        ticker: i.stock.ticker,
      };
    });

  const all = data.map((i) => i[i.ticker]);

  const max = Math.max(...all);
  const min = Math.min(...all);
  const diff = max - min;
  const div = diff / min;
  const perc = div * 100;

  data = data.map((i) => {
    return { ...i, [i.ticker]: ((i[i.ticker] - min) * perc) / diff };
  });

  const offset = data[0]["AAPL"];

  data = data.map((i) => {
    return { ...i, [i.ticker]: roundTo(i[i.ticker] - offset) };
  });

  return data;
}

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
