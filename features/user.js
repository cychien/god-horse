import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { saveEmail } = userSlice.actions;

export default userSlice.reducer;
