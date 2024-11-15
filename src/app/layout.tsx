import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/providers/session-provider";
import { getCurrentUser } from "@/lib/session";

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
  title: "CRM",
  description: "Customer Relationship Managment software",
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
        className={` ${geistSans.variable} ${geistMono.variable}  antialiased `}
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
              <Toaster />
            </SessionProvider>
          ) : (
            <>{children}</>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
