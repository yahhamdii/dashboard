/**
 * Circuit UI Theme Provider
 * 
 * Circuit UI doesn't require a ThemeProvider - it uses design tokens directly via CSS variables.
 * The CSS is imported in global.css conditionally.
 * 
 * This wrapper is a no-op but kept for future extensibility and clarity.
 */

'use client';

// ----------------------------------------------------------------------

type CircuitThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * Circuit UI Theme Provider wrapper
 * 
 * Note: Circuit UI uses design tokens via CSS variables (imported in global.css)
 * No ThemeProvider component needed - components use tokens directly
 */
export function CircuitThemeProviderWrapper({ children }: CircuitThemeProviderProps) {
  // Circuit UI styles are imported in global.css
  // Components will use Circuit UI when feature flags are enabled
  return <>{children}</>;
}

