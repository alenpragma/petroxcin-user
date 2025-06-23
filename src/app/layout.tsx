import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import MainProvider from "@/src/components/Provider/MainProvider";
import { Suspense } from "react";
import ProgressBar from "@/src/lib/progress/Progressbar";

// Font config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata including favicon
export const metadata: Metadata = {
  title: "petroxcin",
  description: "Grow your wealth with smart investments on our secure platform",
  icons: {
    icon: [
      {
        url: "https://api.petroxcin.com/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainProvider>{children}</MainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
