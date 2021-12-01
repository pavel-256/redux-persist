import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    isGood: true,
    isBad: false,
    testObj: {
      a: 1,
      b: {
        c: 1
      },
      d: 222
    }
  },
  reducers: {
    incrementBy: (state, action) => {
      state.value += action.payload;
    },
    decrementBy: (state, action) => {
      state.value -= action.payload;
    }
  }
});

export const { incrementBy, decrementBy } = counterSlice.actions;

export const CounterState = (state) => state.counter;

export default counterSlice.reducer;
