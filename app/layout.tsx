import AppContextProvider from "@/helpers/ContextProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keep-notepad",
  description: "A notepad for all your notes",
  manifest: "/manifest.json",
  icons: { apple: "/keep.png" },
  themeColor: "#202124",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.00, minimum-scale=1.00, maximum-scale=2.00"
      ></meta>

      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
