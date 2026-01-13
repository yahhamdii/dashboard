'use client';

import type { Theme, ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles';
import type { } from './extend-theme-types';
import type { ThemeOptions } from './types';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { createTheme } from './create-theme';
import { Rtl } from './with-settings/right-to-left';
import { CircuitThemeProviderWrapper } from './circuit-theme-provider';

// ----------------------------------------------------------------------

export type ThemeProviderProps = Partial<MuiThemeProviderProps<Theme>> & {
  themeOverrides?: ThemeOptions;
};

/**
 * Theme Provider supporting both MUI and Circuit UI
 * 
 * MUI theme is kept for DataGrid and components not yet migrated
 * Circuit UI theme is added when feature flags are enabled
 */
export function ThemeProvider({ themeOverrides, children, ...other }: ThemeProviderProps) {
  const { currentLang } = useTranslate();

  const muiTheme = createTheme({
    localeComponents: currentLang?.systemValue,
    themeOverrides,
  });

  return (
    <CircuitThemeProviderWrapper>
      <MuiThemeProvider disableTransitionOnChange theme={muiTheme} defaultMode="light" {...other}>
        <CssBaseline enableColorScheme={false} />
        <Rtl direction="ltr">{children}</Rtl>
      </MuiThemeProvider>
    </CircuitThemeProviderWrapper>
  );
}
