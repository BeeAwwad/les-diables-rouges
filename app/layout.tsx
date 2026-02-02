import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/fonts/fonts";
// import Overlay from "@/components/home/overlay";
import Header from "@/components/home/header";
import SideNav from "@/components/home/side-nav";
import { NavProvider } from "@/context/nav-context";
import { Toaster } from "sonner";
import MobileNavOverlay from "@/components/home/mobile-nav-overlay";
import NextTopLoader from "nextjs-toploader";
import { QueryProvider } from "@/provider/QueryProvider";

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
        {/* <Overlay /> */}
        <NavProvider>
          <QueryProvider>
            <Toaster richColors />
            <Header />
            <MobileNavOverlay />
            <main className="sm:grid-cols-base-sm md:grid-cols-base-md relative mt-24 grid grid-cols-1 gap-7 sm:mt-0 sm:h-[calc(80vh-1.75rem)]">
              <NextTopLoader
                showSpinner={false}
                color="#c72736"
                showAtBottom={false}
              />
              <SideNav />
              {children}
            </main>
          </QueryProvider>
        </NavProvider>
      </body>
    </html>
  );
}
