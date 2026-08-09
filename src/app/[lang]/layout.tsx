import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const satoshi = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRECIA",
    template: "%s",
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

export const dynamicParams = false;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${satoshi.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          {lang === "id" ? "Lewati ke konten utama" : "Skip to main content"}
        </a>
        {children}
      </body>
    </html>
  );
}
