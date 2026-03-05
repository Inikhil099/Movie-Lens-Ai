import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: undefined,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const { setUserInfo} = AuthSlice.actions;

export default AuthSlice.reducer;
