import type { Metadata } from "next";
import { ApolloWrapper } from "./apollo-wrapper";
import "./globals.css";
import { poppins } from "@/fonts/fonts";
import Overlay from "@/components/home/overlay";
import Header from "@/components/home/header";
import SideNav from "@/components/home/side-nav";
import { NavProvider } from "@/components/home/nav-context";
import { Toaster } from "sonner";
import NavOverlay from "@/components/home/nav-overlay";

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
    <html className="no-scrollbar" lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generate>"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body
        className={`${poppins.className} bg-primary-100 selection:bg-primary-300 selection:text-primary-100 h-full antialiased`}
      >
        <ApolloWrapper>
          <NavProvider>
            <Toaster richColors />
            <Overlay />
            <Header />
            <NavOverlay />
            <main className="sm:grid-cols-base-sm md:grid-cols-base-md mt-24 grid grid-cols-1 gap-7 sm:h-[calc(80vh-2.25rem)] md:mt-0">
              <SideNav />
              {children}
            </main>
          </NavProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
