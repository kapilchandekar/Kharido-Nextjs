import { Inter } from "next/font/google";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kharido",
  description: "It is shopping website",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
