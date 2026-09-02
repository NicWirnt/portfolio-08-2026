import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nicowiranata.dev"),
  title: {
    default: "Nico Wiranata | Full-stack Developer",
    template: "%s | Nico Wiranata"
  },
  description:
    "Immersive portfolio for Nico Wiranata, a full-stack developer building secure, useful web products.",
  openGraph: {
    title: "Nico Wiranata | Full-stack Developer",
    description:
      "Projects, stack, timeline, and case studies from Nico Wiranata.",
    url: "https://nicowiranata.dev",
    siteName: "nicowiranata.dev",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
