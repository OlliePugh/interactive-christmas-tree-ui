import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interactive Christmas Tree",
  description:
    "A real life christmas tree that can be decorated over the internet!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="body" className={inter.className}>
        {children}
      </body>
    </html>
  );
}
