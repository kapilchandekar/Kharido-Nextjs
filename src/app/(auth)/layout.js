"use client"
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import StoreProvider from "../StoreProvider";
import AuthWrapper from "./AuthWrapper";
import PreLoader from "@/preLoader/preLoader";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., fetching user data, etc.)
    const loadData = async () => {
      // Simulating a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Toaster />
          {loading ? <PreLoader /> : <AuthWrapper>{children}</AuthWrapper>}
        </StoreProvider>
      </body>
    </html>
  );
}
