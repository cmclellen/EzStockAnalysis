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
  return { items: data };
}

export async function getStock(): Promise<GetStocksResponseData> {
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
  return { items: data };
}
