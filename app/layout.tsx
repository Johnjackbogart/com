import type React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ParticleCloudBackground } from "@/components/particle-background";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "John Bogart",
  description: "My personal portfolio",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo_light.ico",
      href: "/logo_light.ico",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo_dark.ico",
      href: "/logo_dark.ico",
    },
  ],
  openGraph: {
    url: "https://johnjackbogart.com",
    type: "website",
    title: "John Bogart",
    description: "My personal website",
    images: [
      {
        url: "https://johnjackbogart.com/og.png",
        width: 1200,
        height: 630,
        alt: "John Bogart – Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://johnjackbogart.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono w-full h-full ">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ParticleCloudBackground className="fixed inset-0 h-full w-full -z-10 pointer-events-none" />
          <div className="relative z-0">
            {/* Main content wrapper */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
