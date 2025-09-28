import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  variant: "info", // "info" | "error" | "success"
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationState(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const setNotification = (notification, time) => (dispatch) => {
  dispatch(setNotificationState(notification));
  setTimeout(() => {
    dispatch(clearNotification());
  }, time);
};

export const { clearNotification, setNotificationState } =
  notificationSlice.actions;
export default notificationSlice.reducer;
