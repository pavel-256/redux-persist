import { createSlice } from "@reduxjs/toolkit";

export const switchSlice = createSlice({
  name: "switch",
  initialState: {
    isOpen: false
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggle } = switchSlice.actions;

export const SwitchState = (state) => state.switch;

export default switchSlice.reducer;
