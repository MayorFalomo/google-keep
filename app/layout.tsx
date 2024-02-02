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
  description:
    "Keep-notepad is note-taking app that allows users to create, organize, and share notes. my google keep notepad (clone), is a web application that replicates the core functionalities of Google Keep. Users can create, edit, and delete notes, as well as organize them into categories. The webApp also supports features such as multi-language translation to your preferred language, multi select and pin, trash or customize notes, set remainders and get notifications, create canvas drawing, send note to other user, pin, trash, archive and customize notes using colors and images, edit your profile, restore and delete forever, pin from archive etc, see other users and search for a note etc."
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
    <html lang="en">
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
