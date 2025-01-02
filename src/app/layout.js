"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Counter App</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <ToastContainer/>
          {children}
        </Provider>

      </body>
    </html>
  );
}
