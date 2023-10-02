"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export const AuthProvider: FC<ProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export function ThemeProviders({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
