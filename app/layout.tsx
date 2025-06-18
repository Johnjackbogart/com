import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ShaderBackground } from "@/components/shader-background"

export const metadata: Metadata = {
  title: "John Jack Bogart - Creative Developer",
  description: "Portfolio of John Jack Bogart, a creative developer.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ShaderBackground /> {/* This is the global, fixed background */}
          <div className="relative z-0">
            {/* Main content wrapper */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
