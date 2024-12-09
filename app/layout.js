import localFont from "next/font/local";
import "./globals.css";
import HomePage from "./home";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Explore the Best AI Tools for Your Business Needs",
  description:
    "Discover cutting-edge AI tools to enhance productivity, creativity, and efficiency. Handpicked for professionals and enthusiasts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <HomePage>{children}</HomePage>
        </main>
      </body>
    </html>
  );
}
