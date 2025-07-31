import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type StocksState = {
  stocktickers: string[];
  status: "idle" | "loading" | "failed";
};

const initialState: StocksState = {
  stocktickers: [],
  status: "idle",
};

export const addStockTickerAsync = createAsyncThunk(
  "stocks/addStockTickerAsync",
  async (payload: { guestId: number; stockId: number }) => {
    const response = await fetch("/api/stocks", {
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

const stocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    removeStockTicker(state: StocksState, action: PayloadAction<string>) {
      state.stocktickers = state.stocktickers.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStockTickerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStockTickerAsync.fulfilled, (state, action) => {
        state.stocktickers.push(action.payload.ticker);
        state.status = "idle";
      })
      .addCase(addStockTickerAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const stockReducers = stocksSlice.reducer;

export const { removeStockTicker } = stocksSlice.actions;
export default stockReducers;
