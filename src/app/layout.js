import { Varela_Round } from "next/font/google";

import { GlobalContextProvider } from "@/config/context/global/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/globals.css";

const varela_round = Varela_Round({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "edit.r",
  description: "Simple text editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={varela_round.className}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
