import { createSlice } from "@reduxjs/toolkit";
const CountannSlice = createSlice({
  name: "countsann",
  initialState: [],
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
  },
});

export const CountannSliceAction = CountannSlice.actions;
export default CountannSlice;
