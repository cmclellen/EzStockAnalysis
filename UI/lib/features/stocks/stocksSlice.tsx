import { GuestStock, Stock } from "@/app/_lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type StocksState = {
  stocks: Stock[];
  status: "idle" | "loading" | "failed";
};

const initialState: StocksState = {
  stocks: [],
  status: "idle",
};

export const addStockTickerAsync = createAsyncThunk(
  "stocks/addStockTickerAsync",
  async (payload: GuestStock) => {
    const response = await fetch("/api/guest-stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return payload;
  }
);

export const removeStockTickerAsync = createAsyncThunk(
  "stocks/removeStockTickerAsync",
  async (payload: GuestStock) => {
    const response = await fetch("/api/guest-stocks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return payload;
  }
);

export const getStockTickerAsync = createAsyncThunk(
  "stocks/getStockTickerAsync",
  async (payload: { guestId: number }) => {
    const response = await fetch(
      `/api/guest-stocks?guestId=${payload.guestId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["guest-stock"] },
      }
    );
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    const dat = response.json();
    return dat;
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeStockTickerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeStockTickerAsync.fulfilled, (state, action: any) => {
        state.stocks = state.stocks.filter(
          (item) => item.stockId !== action.payload.stockId
        );
        state.status = "idle";
      })
      .addCase(removeStockTickerAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addStockTickerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStockTickerAsync.fulfilled, (state, action: any) => {
        state.stocks.push(action.payload);
        state.status = "idle";
      })
      .addCase(addStockTickerAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getStockTickerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStockTickerAsync.fulfilled, (state, action: any) => {
        const newItems = action.payload.items.filter(
          (item: Stock) => !state.stocks.find((i) => i.ticker === item.ticker)
        );
        state.stocks.push(...newItems);
        state.status = "idle";
      })
      .addCase(getStockTickerAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const stockReducers = stocksSlice.reducer;

export default stockReducers;
