import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
