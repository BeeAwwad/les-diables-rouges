import type { Metadata } from "next";
import { ApolloWrapper } from "./apollo-wrapper";
import "./globals.css";
import { poppins } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "Les diables rouges",
  description: "A stats site for manchester united",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#eef2f3] antialiased`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
