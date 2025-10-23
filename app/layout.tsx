import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConstructRent - Baumaschinenverleih",
  description: "Mieten Sie Baumaschinen mit sofortigen digitalen Verträgen. Mobile-first Plattform für Bagger, Bulldozer und mehr.",
  icons: {
    icon: "/bagger-logo-80x80.png",
  },
  openGraph: {
    title: "ConstructRent - Baumaschinenverleih",
    description: "Mieten Sie Baumaschinen mit sofortigen digitalen Verträgen. Mobile-first Plattform für Bagger, Bulldozer und mehr.",
    type: "website",
    locale: "de_DE",
    siteName: "ConstructRent",
    images: [
      {
        url: "/bagger-logo-80x80.png",
        width: 80,
        height: 80,
        alt: "ConstructRent Logo - Baumaschinenverleih",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ConstructRent - Baumaschinenverleih",
    description: "Mieten Sie Baumaschinen mit sofortigen digitalen Verträgen. Mobile-first Plattform für Bagger, Bulldozer und mehr.",
    images: ["/bagger-logo-80x80.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
