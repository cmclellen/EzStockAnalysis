import supabase from "./supabase";

export type Guest = {
  email: string;
  fullName: string;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from("guest")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function createGuest(newGuest: Guest) {
  const { data, error } = await supabase.from("guest").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
