"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StoreProvider from "../StoreProvider";
import FilterProducts from "../components/filterProducts/FilterProducts";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Kharido",
//   description: "It is shopping website",
// };

export default function RootLayout({ children }) {
  const [query, setKey] = useState("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <StoreProvider>
            <Toaster />
            <Header setKey={setKey} />
            {query ? <FilterProducts query={query} /> : children}
            <Footer />
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
