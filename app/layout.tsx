import type { Metadata } from "next";
import { ApolloWrapper } from "./apollo-wrapper";
import "./globals.css";
import { poppins } from "@/fonts/fonts";
import Overlay from "@/components/home-page/overlay";
import Header from "@/components/home-page/header";
import SideNav from "@/components/home-page/side-nav";

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
      <body
        className={`${poppins.className} h-screen bg-[#eef2f3] antialiased`}
      >
        <ApolloWrapper>
          <Overlay />
          <Header />
          <main className="relative grid grid-cols-1 gap-7 overflow-y-hidden sm:grid-cols-base-sm md:grid-cols-base-md lg:h-[calc(80vh-3.5rem)]">
            <SideNav />
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
