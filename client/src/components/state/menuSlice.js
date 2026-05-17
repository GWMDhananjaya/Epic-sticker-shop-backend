import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false; // This ensures the menu closes
    },
  },
});

export const { toggleMenu, closeMenu } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
