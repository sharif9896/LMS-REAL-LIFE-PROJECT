import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "./CountTimingSlice";
import responsie from "./responsie";
import CountTimingSlice from "./CountTimingSlice";

const ecommerce = configureStore({
  reducer: {
    counts: CountTimingSlice.reducer,
  },
});
export default ecommerce;
