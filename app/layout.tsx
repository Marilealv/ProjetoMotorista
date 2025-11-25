import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Motorista Particular",
  description: "Transporte executivo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
