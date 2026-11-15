import type { Metadata } from "next";
import "./globals.css";

// Metadata defines the title and description shown by the browser.
export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Create and share shortened URLs",
};

// RootLayout is the shared layout for all pages in our application.
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="en">
      <body>
      {/* Displays whichever page.tsx is currently being visited. */}
      {children}
      </body>
      </html>
  );
}
