import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgImg: "",
  number: "",
  words: "",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    saveBgImg: (state, action) => {
      state.bgImg = action.payload;
    },
    saveTicket: (state, action) => {
      const { number, words } = action.payload;
      state.number = number;
      state.words = words;
    },
    resetTicket: (state, _) => {
      state.number = "";
      state.words = "";
    },
  },
});

export const { saveBgImg, saveTicket, resetTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
