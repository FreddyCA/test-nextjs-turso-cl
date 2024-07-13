import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/ui/globals.css";
import { montserrat } from "./ui/fonts";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Test NextJS Turso Clf",
  description:
    "Aplicacion next js con base de datos turso y alojamiento en cloudflare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
