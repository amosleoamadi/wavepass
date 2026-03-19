import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "../services/authApi";
import { overviewApi } from "../services/overview";
import { attendeeApi } from "../services/attendeeApi";

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [attendeeApi.reducerPath]: attendeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      overviewApi.middleware,
      attendeeApi.middleware,
    ),
});

export const persistor = persistStore(store);
