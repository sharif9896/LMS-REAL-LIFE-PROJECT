import { createSlice } from "@reduxjs/toolkit";

const responsie = createSlice({
  name: "res",
  initialState: {
    Boolean: false,
  },
  reducers: {
    setResponse: (state, action) => {
      return (state.Boolean = action.payload);
    },
  },
});
export const resAction = responsie.actions;
export default responsie;
