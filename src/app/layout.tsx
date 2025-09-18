"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";

// Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Poppins font from Google Fonts (no download needed)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ✅ MUI theme with Poppins as default font
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
              top: 20,
              right: 20,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#363636",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                padding: "16px",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                style: {
                  background: "#4caf50",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#4caf50",
                },
              },
              error: {
                style: {
                  background: "#f44336",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#f44336",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
