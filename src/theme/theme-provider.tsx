'use client';

import React from 'react';

import type { ThemeOptions } from './types';

import { Rtl } from './with-settings/right-to-left';
import { CircuitThemeProviderWrapper } from './circuit-theme-provider';

// ----------------------------------------------------------------------

export type ThemeProviderProps = {
  themeOverrides?: ThemeOptions;
  modeStorageKey?: string;
  defaultMode?: 'light' | 'dark' | 'system';
  children: React.ReactNode;
};

/**
 * Theme Provider basé uniquement sur Circuit UI
 *
 * - Ne dépend plus d'un thème MUI
 * - Garde le wrapper RTL et le wrapper Circuit UI
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <CircuitThemeProviderWrapper>
      <Rtl direction="ltr">{children}</Rtl>
    </CircuitThemeProviderWrapper>
  );
}

