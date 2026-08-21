import { Inter, Cairo } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
  weight: ["400", "500", "600", "700"],
});

export const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-primary",
  weight: ["400", "500", "600", "700", "800"],
});

