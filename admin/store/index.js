import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "./ItemSlice";
import responsie from "./responsie";

const ecommerce = configureStore({
  reducer: {
    items: ItemSlice.reducer,
    res: responsie.reducer,
  },
});
export default ecommerce;
