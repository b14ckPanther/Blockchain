import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ubuntuHeading = Ubuntu({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Majdoub BC — Blockchain Analytics Framework",
  description:
    "A General Framework for Blockchain Analytics — Academic Presentation by Mohammed Majdoub",
  keywords: "blockchain, analytics, Bitcoin, Ethereum, Scala, framework",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${ubuntuMono.variable} ${ubuntuHeading.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
