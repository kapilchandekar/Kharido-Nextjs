import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getProductsApi } from "./productSlice/productSlice";
import cartReducer from "../lib/productSlice/cartSlice";
import { userApi } from "./userSlice/userSlice";

export const makeStore = configureStore({
  reducer: {
    cart: cartReducer,
    [getProductsApi.reducerPath]: getProductsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(getProductsApi.middleware, userApi.middleware),
});

setupListeners(makeStore.dispatch);
