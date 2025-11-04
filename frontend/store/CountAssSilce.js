import { createSlice } from "@reduxjs/toolkit";
const CountassSlice = createSlice({
  name: "countsass",
  initialState: [],
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
  },
});

export const CountassSliceAction = CountassSlice.actions;
export default CountassSlice;
