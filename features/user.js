import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveAccount: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    resetAccount: (state, _) => {
      state.name = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { saveAccount, resetAccount } = userSlice.actions;

export default userSlice.reducer;
