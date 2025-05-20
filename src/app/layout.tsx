import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fact Verification App",
  description: "A web application for fact verification",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
