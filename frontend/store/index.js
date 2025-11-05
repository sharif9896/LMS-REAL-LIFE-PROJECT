import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "./CountTimingSlice";
import responsie from "./responsie";
import CountTimingSlice from "./CountTimingSlice";
import CountassSlice from "./CountAssSilce";
import CountannSlice from "./CountannSlice";

const ecommerce = configureStore({
  reducer: {
    counts: CountTimingSlice.reducer,
    countsass: CountassSlice.reducer,
    countsann: CountannSlice.reducer,
  },
});
export default ecommerce;
