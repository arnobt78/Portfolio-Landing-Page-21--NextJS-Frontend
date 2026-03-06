"use client";

import * as React from "react";
import {ThemeProvider as NextThemesProvider, ThemeProviderProps} from "next-themes";

/** Wraps app with next-themes: class-based dark/light (attribute="class"), system preference supported */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // Adds 'dark' or 'light' to <html> for Tailwind dark: variants
      defaultTheme="dark" // Default theme when no preference
      enableSystem // Respect OS theme when no explicit choice
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
