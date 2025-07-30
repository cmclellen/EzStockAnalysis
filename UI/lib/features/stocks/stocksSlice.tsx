import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StocksState = {
  stocktickers: string[];
};

const initialState: StocksState = {
  stocktickers: [],
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    addStockTicker(state: StocksState, action: PayloadAction<string>) {
      state.stocktickers.push(action.payload);
    },
    removeStockTicker(state: StocksState, action: PayloadAction<string>) {
      state.stocktickers = state.stocktickers.filter(
        (item) => item !== action.payload
      );
    },
  },
});

const stockReducers = stocksSlice.reducer;

export const { addStockTicker, removeStockTicker } = stocksSlice.actions;
export default stockReducers;
