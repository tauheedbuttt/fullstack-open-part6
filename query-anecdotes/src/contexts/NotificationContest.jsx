import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const setNotification = (message, time = 5) => {
    notificationDispatch({
      type: "SET",
      payload: message,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, time * 1000);
  };

  return { setNotification, notification };
};

export default NotificationContext;
