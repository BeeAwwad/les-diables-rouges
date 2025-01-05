import type { Metadata } from "next";
import { ApolloWrapper } from "./apollo-wrapper";
import "./globals.css";
import { poppins } from "@/fonts/fonts";
import Overlay from "@/components/home/overlay";
import Header from "@/components/home/header";
import SideNav from "@/components/home/side-nav";

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
    <html
      className="scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary hover:scrollbar-thumb-primary-300"
      lang="en"
    >
      <body
        className={`${poppins.className} h-full bg-primary-100 antialiased scrollbar-none`}
      >
        <ApolloWrapper>
          <Overlay />
          <Header />
          <main className="relative grid h-[calc(80vh-3.5rem)] grid-cols-1 gap-7 sm:grid-cols-base-sm md:grid-cols-base-md">
            <SideNav />
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
