export type UserProfileInfo = {
  username?: string | null;
  imageUrl?: string | null;
};

export type Stock = {
  stockId: number;
  ticker: string;
  description: string;
};

export type GuestStock = {
  guestId: number;
  stockId: number;
};
