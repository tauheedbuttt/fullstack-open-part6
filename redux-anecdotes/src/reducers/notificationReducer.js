import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  variant: "info", // "info" | "error" | "success"
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = {
        variant: "info",
        ...action.payload,
      };
      return notification;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
