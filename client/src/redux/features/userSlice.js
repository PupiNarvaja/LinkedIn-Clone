import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
}

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  }
});

export const { setUser } = counterSlice.actions;

export default counterSlice.reducer;