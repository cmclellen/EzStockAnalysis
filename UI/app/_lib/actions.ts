"use server";

import { compareAsc, format } from "date-fns";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { Stock } from "./types";

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

function addTickerDetail(o: any, i: any) {
  const original = i.closing;
  o[i.stock.ticker] = roundTo(original);
  o[i.stock.ticker + "-detail"] = {
    original,
    ticker: i.stock.ticker,
  };
  return o;
}

export async function getYearToDate({
  stockIds,
}: {
  stockIds: number[];
}): Promise<any> {
  console.log(stockIds);
  const { data: stockClosing, error } = await supabase
    .from("stock-closing")
    .select("*, stock(ticker)")
    .in("stockId", stockIds);

  if (error) throw error;

  const tickers = [...new Set(stockClosing.map((i) => i.stock.ticker))];

  let data = stockClosing!
    .sort((a, b) => compareAsc(a.date, b.date))
    .reduce((acc, i) => {
      const formattedDay = format(i.date, "MMM dd, yyyy");
      let item = acc.find((i: any) => i.formattedDay == formattedDay);
      if (item) {
        item = addTickerDetail(item, i);
      } else {
        item = addTickerDetail({ formattedDay }, i);
        acc.push(item);
      }
      return acc;
    }, []);

  tickers.forEach((ticker: string) => {
    const all = data.map((i: any) => i[ticker] ?? 0);

    const max = Math.max(...all);
    const min = Math.min(...all);
    const diff = max - min;
    const div = diff / min;
    const perc = div * 100;

    data = data.map((i: any) => {
      return { ...i, [ticker]: ((i[ticker] - min) * perc) / diff };
    });

    const offset = data[0][ticker];

    data = data.map((i: any) => {
      return { ...i, [ticker]: roundTo(i[ticker] - offset) };
    });
  });

  return data;
}
