import { Inter, Noto_Sans_Arabic } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
  weight: ["400", "500", "600", "700"],
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-primary",
  weight: ["400", "500", "600", "700"],
});
