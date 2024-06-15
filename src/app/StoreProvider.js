"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

export default function StoreProvider({ children }) {
  return <Provider store={makeStore}>{children}</Provider>;
}
