"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { StockTicker } from "./types";

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
  items: StockTicker[];
};

export async function getTrendingStock(): Promise<GetStocksResponseData> {
  const { data: stockTickers, error } = await supabase
    .from("stock-ticker")
    .select("*")
    .range(0, 3);

  if (error) throw new Error("Failed fetching stock tickers");

  return { items: stockTickers };
}

export async function getStock(query: string): Promise<GetStocksResponseData> {
  const { data: stockTickers, error } = await supabase
    .from("stock-ticker")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw new Error("Failed fetching stock tickers");
  return { items: stockTickers };
}
