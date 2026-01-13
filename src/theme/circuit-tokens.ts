/**
 * Circuit UI Design Tokens Mapping
 * 
 * Maps MUI theme values to Circuit UI CSS variables for easier migration
 * 
 * Note: Circuit UI uses CSS variables (--cui-*) for colors, not JavaScript objects.
 * This mapping provides CSS variable names that can be used in styles.
 */

import { light as circuitTheme } from '@sumup-oss/design-tokens';

// ----------------------------------------------------------------------

/**
 * Mapping MUI palette colors → Circuit UI CSS variables
 * 
 * These are CSS variable names that Circuit UI uses.
 * Use them in your styles like: color: var(--cui-fg-accent);
 */
export const colorMapping = {
  // Primary colors (Circuit UI uses accent colors)
  'primary.main': 'var(--cui-fg-accent)',
  'primary.light': 'var(--cui-fg-accent-hovered)',
  'primary.dark': 'var(--cui-fg-accent-pressed)',
  'primary.contrastText': 'var(--cui-fg-on-strong)',
  
  // Error colors
  'error.main': 'var(--cui-fg-danger)',
  'error.light': 'var(--cui-fg-danger-hovered)',
  'error.dark': 'var(--cui-fg-danger-pressed)',
  'error.contrastText': 'var(--cui-fg-on-strong)',
  
  // Warning colors (Circuit UI doesn't have warning, using danger)
  'warning.main': 'var(--cui-fg-warning)',
  'warning.light': 'var(--cui-fg-warning-hovered)',
  'warning.dark': 'var(--cui-fg-warning-pressed)',
  'warning.contrastText': 'var(--cui-fg-normal)',
  
  // Success colors
  'success.main': 'var(--cui-fg-success)',
  'success.light': 'var(--cui-fg-success-hovered)',
  'success.dark': 'var(--cui-fg-success-pressed)',
  'success.contrastText': 'var(--cui-fg-on-strong)',
  
  // Info colors (Circuit UI doesn't have info, using accent)
  'info.main': 'var(--cui-fg-accent)',
  'info.light': 'var(--cui-fg-accent-hovered)',
  'info.dark': 'var(--cui-fg-accent-pressed)',
  'info.contrastText': 'var(--cui-fg-on-strong)',
  
  // Text colors
  'text.primary': 'var(--cui-fg-normal)',
  'text.secondary': 'var(--cui-fg-subtle)',
  'text.disabled': 'var(--cui-fg-disabled)',
  
  // Background colors
  'background.paper': 'var(--cui-bg-normal)',
  'background.default': 'var(--cui-bg-subtle)',
  
  // Divider
  'divider': 'var(--cui-border-subtle)',
  
  // Common
  'common.white': 'var(--cui-bg-normal)',
  'common.black': 'var(--cui-fg-normal)',
} as const;

// ----------------------------------------------------------------------

/**
 * Mapping MUI spacing → Circuit UI CSS variables
 * Circuit UI uses CSS variables for spacing
 */
export const spacingMapping = {
  // MUI spacing (8px base) → Circuit CSS variables
  0: '0',
  0.5: 'var(--cui-spacings-byte)', // 4px
  1: 'var(--cui-spacings-kilo)', // 8px
  2: 'var(--cui-spacings-mega)', // 16px
  3: 'var(--cui-spacings-giga)', // 24px
  4: 'var(--cui-spacings-tera)', // 32px
  5: 'var(--cui-spacings-peta)', // 40px
  6: 'var(--cui-spacings-exa)', // 48px
} as const;

// ----------------------------------------------------------------------

/**
 * Mapping MUI typography → Circuit UI typography
 */
export const typographyMapping = {
  fontFamily: circuitTheme.fontStack.default,
  fontSize: {
    h1: circuitTheme.typography.headline.one.fontSize,
    h2: circuitTheme.typography.headline.two.fontSize,
    h3: circuitTheme.typography.headline.three.fontSize,
    h4: circuitTheme.typography.headline.four.fontSize,
    h5: circuitTheme.typography.subHeadline.fontSize,
    h6: circuitTheme.typography.subHeadline.fontSize,
    body1: circuitTheme.typography.body.one.fontSize,
    body2: circuitTheme.typography.body.two.fontSize,
    caption: circuitTheme.typography.body.two.fontSize,
  },
  fontWeight: {
    regular: circuitTheme.fontWeight.regular,
    medium: circuitTheme.fontWeight.regular, // Circuit UI only has regular and bold
    semibold: circuitTheme.fontWeight.bold, // Use bold as semibold fallback
    bold: circuitTheme.fontWeight.bold,
  },
} as const;

// ----------------------------------------------------------------------

/**
 * Get Circuit UI color by MUI color key
 */
export function getCircuitColor(muiColorKey: keyof typeof colorMapping): string {
  return colorMapping[muiColorKey];
}

// ----------------------------------------------------------------------

/**
 * Get Circuit UI spacing by MUI spacing multiplier
 */
export function getCircuitSpacing(muiSpacing: keyof typeof spacingMapping): string {
  return spacingMapping[muiSpacing];
}

// ----------------------------------------------------------------------

/**
 * Circuit UI theme export for direct use
 */
export { circuitTheme };

