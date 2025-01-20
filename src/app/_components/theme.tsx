"use client";

import { useState, useEffect } from "react";
import * as THREE from "three";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { isMobile } from "react-device-detect";

//https://github.com/shadcn-ui/ui/issues/5706
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider enableSystem={true} {...props}>
      {children}
    </NextThemesProvider>
  );
}

const textPositions: TextPositions = isMobile
  ? {
      hello: new THREE.Vector3(-1.25, 2, 5),
      imJohn: new THREE.Vector3(0.5, 2, 5),
      callMeJack: new THREE.Vector3(-0.5, -1.5, 5),
      cleveland: new THREE.Vector3(-0.5, -1.5, 5),
      developer: new THREE.Vector3(-0.5, 1.5, 5),
    }
  : {
      hello: new THREE.Vector3(-1.25, 2, 5),
      imJohn: new THREE.Vector3(0.5, 2, 5),
      callMeJack: new THREE.Vector3(-0.5, -1.5, 5),
      cleveland: new THREE.Vector3(-0.5, -1.5, 5),
      developer: new THREE.Vector3(-0.5, 1.5, 5),
    };

interface TextPositions {
  hello: THREE.Vector3;
  imJohn: THREE.Vector3;
  callMeJack: THREE.Vector3;
  cleveland: THREE.Vector3;
  developer: THREE.Vector3;
}
interface Background {
  background: string;
}

interface Backgrounds {
  light: Background;
  dark: Background;
}

interface Fill {
  fill: string;
}

interface Fills {
  dark: Fill;
  light: Fill;
}

type Themes = "light" | "dark";

//would like to restrict this further to the only possible bloom levels but...
//https://www.reddit.com/r/typescript/comments/1bt6ltw/is_it_possible_to_have_a_union_of_specific/
export type Bloom = number;

export interface ThemeFill {
  theme: Themes;
  bloom: Bloom;
  isSystem: boolean;
  isMobile: boolean;
  fill: string;
  background: string;
  textPositions: TextPositions;
}

export type Theme = ThemeFill | undefined | null;

export function useThemeToFill() {
  //theme may be undefined, so need to properly handle both here. The decision is to set the icon to be invisible
  const { resolvedTheme: nextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //i don't like this
  if (!mounted) return null;
  const isSystem = nextTheme === "system" ? true : false;
  const theme: Themes = nextTheme as Themes; //can return string | undefined, may  as well typecast
  const fills: Fills = {
    dark: {
      fill: "#ffffff",
    },
    light: {
      fill: "#000000",
    },
  };
  const backgrounds: Backgrounds = {
    dark: {
      background: "#000",
    },
    light: {
      background: "#fff",
    },
  };
  const bloom: Bloom = nextTheme === "dark" ? 0.5 : -2;
  const theming: Theme = {
    theme: theme,
    bloom: bloom,
    isSystem: isSystem,
    isMobile: isMobile,
    fill: fills[theme].fill,
    background: backgrounds[theme].background,
    textPositions: textPositions,
  };

  return theming;
}
