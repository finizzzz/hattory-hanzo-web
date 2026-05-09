import type { Metadata } from "next";
import "./globals.css";

// Questi sono i "metadati": le informazioni che Google e i social leggono
export const metadata: Metadata = {
  title: "Hattori Hanzo | Leggendaria Forgiatura",
  description: "Sito di presentazione delle katane originali di Hattori Hanzo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* Qui creiamo il collegamento con Fontshare per scaricare Nippo e Satoshi */}
        <link 
          href="https://api.fontshare.com/v2/css?f[]=nippo@700,500&f[]=satoshi@900,700,500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {/* 'children' rappresenta tutto il contenuto che scriveremo nelle altre pagine */}
        {children}
      </body>
    </html>
  );
}
