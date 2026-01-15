// import type {
//   Theme,
//   Shadows,
//   Components,
//   ColorSystemOptions,
//   CssVarsThemeOptions,
//   SupportedColorScheme,
//   ThemeOptions as MuiThemeOptions,
// import type { CustomShadows } from './core/custom-shadows';

// ----------------------------------------------------------------------

/**
 * Theme options
 * Extended type that includes additional properties for color schemes and CSS variables.
 *
 * @see https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createTheme.ts
 */

export type ThemeColorScheme = 'light' | 'dark'; // SupportedColorScheme;

export type ThemeCssVariables = {
  cssVarPrefix?: string;
  rootSelector?: string;
  colorSchemeSelector?: string;
  disableCssColorScheme?: boolean;
  shouldSkipGeneratingVar?: boolean;
}; // Pick<CssVarsThemeOptions, ...>

export type ColorSchemeOptionsExtended = {
  palette?: any; // ColorSystemOptions['palette']
  shadows?: any; // Partial<Shadows>
} & Record<string, any>;

export type SchemesRecord<T> = Partial<Record<ThemeColorScheme, T>>;

export type ThemeOptions = {
  colorSchemes?: SchemesRecord<ColorSchemeOptionsExtended>;
  cssVariables?: ThemeCssVariables;
  components?: any; // Components<Theme>;
  shape?: { borderRadius: number };
  direction?: 'ltr' | 'rtl';
  mixins?: any;
  typography?: any;
} & Record<string, any>;

// ----------------------------------------------------------------------

/**
 * DeepPartial utility type that recursively makes all properties of T optional.
 * This is useful for partial configurations and merging deeply nested objects.
 * Supports objects, arrays, and primitive types.
 */
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
