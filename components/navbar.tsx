"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const desktopLinks = [
  { label: "Contact", href: "#contact" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
];

const mobileLinks = desktopLinks;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : undefined;
  const isDark = currentTheme === "dark";
  const iconColorClass = isDark ? "text-white" : "text-black";
  const toggleButtonBase =
    "h-10 flex items-center justify-center rounded-none border border-border/50 bg-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const toggleButtonSquare = `${toggleButtonBase} w-10`;
  const toggleButtonBg = isDark
    ? "text-white focus-visible:ring-white focus-visible:ring-offset-black"
    : "text-black focus-visible:ring-black focus-visible:ring-offset-white";
  const connectButtonBase =
    "h-10 items-center justify-center gap-2 rounded-none border border-border/50 px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const connectButtonBg = isDark
    ? "bg-black text-white hover:bg-white hover:text-black focus-visible:ring-white focus-visible:ring-offset-black"
    : "bg-white text-black hover:bg-black hover:text-white focus-visible:ring-black focus-visible:ring-offset-white";

  return (
    <header className="relative sticky top-0 z-20 w-full bg-background/10 backdrop-blur-md pb-[4px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-[4px]">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo_light.svg"
              alt="Logo"
              width={40}
              height={40}
              className="block dark:hidden"
            />
            <Image
              src="/logo_dark.svg"
              alt="Logo"
              width={40}
              height={40}
              className="hidden dark:block"
            />
            <span
              className={cn(
                "font-bold text-lg hidden sm:inline",
                isDark ? "text-white" : "text-black",
              )}
            >
              John Bogart
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {desktopLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-wider hover:text-foreground",
                  "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={cn(
                "md:hidden h-10 w-10 flex items-center justify-center rounded-none border border-border/50 bg-transparent p-0 hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                iconColorClass,
              )}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={cn(toggleButtonSquare, toggleButtonBg)}
            >
              {mounted ? (
                isDark ? (
                  <Moon className={`h-5 w-5 ${iconColorClass}`} />
                ) : (
                  <Sun className={`h-5 w-5 ${iconColorClass}`} />
                )
              ) : (
                <Sun className={`h-5 w-5 ${iconColorClass}`} />
              )}
            </button>
            <Link href="https://twitter.com/JohnJackBogart">
              <Button
                variant="outline"
                className={cn(
                  "hidden md:inline-flex",
                  connectButtonBase,
                  connectButtonBg,
                )}
              >
                Connect on Twitter
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-20 bg-background/15 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <div
              id="mobile-menu"
              className={cn(
                "fixed right-4 top-16 z-30 w-56 border border-border/70 p-4 shadow-lg shadow-black/40 backdrop-blur",
                "bg-background/90",
              )}
            >
              <div className="flex flex-col space-y-3">
                {mobileLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-sm font-semibold uppercase tracking-wider",
                      "text-foreground",
                      "hover:text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="https://twitter.com/JohnJackBogart">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full md:hidden",
                      connectButtonBase,
                      connectButtonBg,
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    Connect on Twitter
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <span className="pointer-events-none absolute left-[10px] right-[10px] bottom-0 border-b border-border/20" />
    </header>
  );
}
