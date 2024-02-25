import { Varela_Round } from "next/font/google";

import 'bootstrap/dist/css/bootstrap.min.css';
import "@/app/styles/globals.css";

const valrela_round = Varela_Round({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "edit.r",
  description: "Simple text editor"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={valrela_round.className}>
        {children}
      </body>
    </html>
  );
}
