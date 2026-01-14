import { pxToRem, setFont } from 'minimal-shared/utils';

import { themeConfig } from '../theme-config';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type TypographyVariantsOptions = {
  fontFamily?: string;
  fontWeightLight?: number;
  fontWeightRegular?: number;
  fontWeightMedium?: number;
  fontWeightBold?: number;
  h1?: React.CSSProperties;
  h2?: React.CSSProperties;
  h3?: React.CSSProperties;
  h4?: React.CSSProperties;
  h5?: React.CSSProperties;
  h6?: React.CSSProperties;
  subtitle1?: React.CSSProperties;
  subtitle2?: React.CSSProperties;
  body1?: React.CSSProperties;
  body2?: React.CSSProperties;
  caption?: React.CSSProperties;
  overline?: React.CSSProperties;
  button?: React.CSSProperties;
  [key: string]: any;
};

// ----------------------------------------------------------------------


/**
 * Generates responsive font styles for given breakpoints
 * @param sizes - Object mapping breakpoints to font sizes in pixels
 * @returns CSS media query styles for responsive font sizes
 */
type FontSizesInput = Partial<Record<Breakpoint, number>>;
type FontSizesResult = Record<string, { fontSize: React.CSSProperties['fontSize'] }>;

function responsiveFontSizes(sizes: FontSizesInput): FontSizesResult {
  const breakpointValues: Record<Breakpoint, number> = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  };

  const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const up = (key: Breakpoint) => `@media (min-width:${breakpointValues[key]}px)`;

  return keys.reduce((styles, breakpoint) => {
    const size = sizes[breakpoint];

    if (size !== undefined && size >= 0) {
      styles[up(breakpoint)] = {
        fontSize: pxToRem(size),
      };
    }

    return styles;
  }, {} as FontSizesResult);
}

// ----------------------------------------------------------------------

const primaryFont = setFont(themeConfig.fontFamily.primary);
const secondaryFont = setFont(themeConfig.fontFamily.secondary);

const baseTypography: TypographyVariantsOptions = {
  fontFamily: primaryFont,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

/* **********************************************************************
 * 📦 Final
 * **********************************************************************/
/**
 * Line height is set as a unitless ratio: 22 / 14 ≈ 1.57
 * - 22px is the desired visual line height
 * - 14px is the font size
 * This keeps the line height scalable and responsive.
 */
export const typography: TypographyVariantsOptions = {
  ...baseTypography,
  h1: {
    fontFamily: secondaryFont,
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontFamily: secondaryFont,
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontFamily: secondaryFont,
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ md: 24 }),
  },
  h5: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19 }),
  },
  h6: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18 }),
  },
  subtitle1: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: baseTypography.fontWeightBold,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
  },
};
