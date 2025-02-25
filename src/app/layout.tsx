import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import Nav from "&/nav";
import ThemeProvider from "&/theme";

export const metadata: Metadata = {
  title: "Hi :)",
  description: "My Personal Website, welcome!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="flex h-dvh flex-col">
          <ThemeProvider attribute="class" defaultTheme="system">
            <Nav />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
