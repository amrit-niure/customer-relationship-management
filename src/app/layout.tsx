import type { Metadata } from "next";import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/providers/session-provider";
import {  getCurrentUser } from "@/lib/session";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Client Record Management",
  description: "Customer Record Managment software",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const sessionData = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${geistSans} ${geistMono} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          {sessionData ? (
            <SessionProvider value={sessionData}>
              {children}
              <ShadcnToaster />
            </SessionProvider>
          ) : (
            <>{children}</>
          )}
          <ShadcnToaster />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
