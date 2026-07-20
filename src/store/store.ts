import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commentsReducer from "./slices/commentsSlice";
import { commentsApi } from "./api/commentsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;