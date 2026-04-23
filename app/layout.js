import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FindIt UPES — Campus Lost & Found Smart System",
  description:
    "UPES Dehradun's intelligent lost & found platform. Report lost items, discover found ones, and get smart matches — all in one place.",
  keywords: ["lost and found", "UPES", "campus", "Dehradun", "FindIt"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
