import { createSlice } from '@reduxjs/toolkit'
const CountTimingSlice = createSlice({
    name: 'counts',
    initialState: [],
    reducers: {
        setItems: (state, action) => {
             return action.payload
        },
    }
})

export const CountTimingAction= CountTimingSlice.actions
export default CountTimingSlice;
