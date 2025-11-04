import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "./CountTimingSlice";
import responsie from "./responsie";
import CountTimingSlice from "./CountTimingSlice";
import CountassSlice from "./CountAssSilce";

const ecommerce = configureStore({
  reducer: {
    counts: CountTimingSlice.reducer,
    countsass: CountassSlice.reducer,
  },
});
export default ecommerce;
