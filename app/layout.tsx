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
      className="scrollbar-thin scrollbar-track-primary-100 scrollbar-thumb-primary hover:scrollbar-thumb-primary-300"
      lang="en"
    >
      <head>
        <link
          rel="icon"
          href="/icon?<generate>"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body
        className={`${poppins.className} h-full bg-primary-100 antialiased scrollbar-none selection:bg-primary-300 selection:text-primary-100`}
      >
        <ApolloWrapper>
          <Overlay />
          <Header />
          <main className="grid grid-cols-1 gap-7 overflow-y-hidden sm:h-[calc(80vh-3.5rem)] sm:grid-cols-base-sm md:grid-cols-base-md">
            <SideNav />
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
