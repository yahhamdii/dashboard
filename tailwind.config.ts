import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-color-scheme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Primary color palette (from MUI theme)
        primary: {
          lighter: '#C8FAD6',
          light: '#5BE49B',
          DEFAULT: '#00A76F',
          main: '#00A76F',
          dark: '#007867',
          darker: '#004B50',
        },
        // Secondary color palette
        secondary: {
          lighter: '#EFD6FF',
          light: '#C684FF',
          DEFAULT: '#8E33FF',
          main: '#8E33FF',
          dark: '#5119B7',
          darker: '#27097A',
        },
        // Info color palette
        info: {
          lighter: '#CAFDF5',
          light: '#61F3F3',
          DEFAULT: '#00B8D9',
          main: '#00B8D9',
          dark: '#006C9C',
          darker: '#003768',
        },
        // Success color palette
        success: {
          lighter: '#D3FCD2',
          light: '#77ED8B',
          DEFAULT: '#22C55E',
          main: '#22C55E',
          dark: '#118D57',
          darker: '#065E49',
        },
        // Warning color palette
        warning: {
          lighter: '#FFF5CC',
          light: '#FFD666',
          DEFAULT: '#FFAB00',
          main: '#FFAB00',
          dark: '#B76E00',
          darker: '#7A4100',
        },
        // Error color palette
        error: {
          lighter: '#FFE9D5',
          light: '#FFAC82',
          DEFAULT: '#FF5630',
          main: '#FF5630',
          dark: '#B71D18',
          darker: '#7A0916',
        },
        // Grey scale palette
        grey: {
          50: '#FCFDFD',
          100: '#F9FAFB',
          200: '#F4F6F8',
          300: '#DFE3E8',
          400: '#C4CDD5',
          500: '#919EAB',
          600: '#637381',
          700: '#454F5B',
          800: '#1C252E',
          900: '#141A21',
        },
        // Text colors
        text: {
          primary: {
            light: '#1C252E', // grey.800 in light mode
            dark: '#FFFFFF',
          },
          secondary: {
            light: '#637381', // grey.600 in light mode
            dark: '#919EAB', // grey.500 in dark mode
          },
          disabled: {
            light: '#919EAB', // grey.500 in light mode
            dark: '#637381', // grey.600 in dark mode
          },
        },
        // Background colors
        background: {
          paper: {
            light: '#FFFFFF',
            dark: '#1C252E', // grey.800
          },
          default: {
            light: '#FFFFFF',
            dark: '#141A21', // grey.900
          },
          neutral: {
            light: '#F4F6F8', // grey.200
            dark: '#28323D',
          },
        },
        // Action colors with alpha support
        action: {
          hover: 'rgba(145, 158, 171, 0.08)', // grey.500 with alpha
          selected: 'rgba(145, 158, 171, 0.16)',
          focus: 'rgba(145, 158, 171, 0.24)',
          disabled: 'rgba(145, 158, 171, 0.8)',
          disabledBackground: 'rgba(145, 158, 171, 0.24)',
        },
      },
      fontFamily: {
        primary: ['Public Sans Variable', 'sans-serif'],
        secondary: ['Barlow', 'sans-serif'],
        sans: ['Public Sans Variable', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.57143' }], // 14px
        base: ['1rem', { lineHeight: '1.5' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.55556' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.5' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '1.33333' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '1.26667' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '1.22222' }], // 36px
        '5xl': ['3rem', { lineHeight: '1.16667' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1.13333' }], // 60px
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        0.5: '0.125rem', // 2px
        1.5: '0.375rem', // 6px
        2.5: '0.625rem', // 10px
        3.5: '0.875rem', // 14px
        4.5: '1.125rem', // 18px
        5.5: '1.375rem', // 22px
      },
      borderRadius: {
        sm: '0.5rem', // 8px
        DEFAULT: '0.75rem', // 12px
        md: '1rem', // 16px
        lg: '1.25rem', // 20px
        xl: '1.5rem', // 24px
        '2xl': '2rem', // 32px
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(145, 158, 171, 0.2)',
        DEFAULT:
          '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
        md: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 20px 40px -4px rgba(145, 158, 171, 0.12)',
        lg: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 24px 48px 0 rgba(145, 158, 171, 0.12)',
        xl: '0 0 4px 0 rgba(145, 158, 171, 0.2), 0 32px 64px -4px rgba(145, 158, 171, 0.16)',
        card: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
        dialog:
          '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 20px 40px -4px rgba(145, 158, 171, 0.12)',
        dropdown: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
      },
      transitionDuration: {
        shorter: '200ms',
        short: '250ms',
        standard: '300ms',
        complex: '375ms',
        enteringScreen: '225ms',
        leavingScreen: '195ms',
      },
      transitionTimingFunction: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      zIndex: {
        appBar: '1100',
        drawer: '1200',
        modal: '1300',
        snackbar: '1400',
        tooltip: '1500',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      animation: {
        slideIn: 'slideIn 225ms cubic-bezier(0.0, 0, 0.2, 1)',
        slideOut: 'slideOut 195ms cubic-bezier(0.4, 0, 1, 1)',
        fadeIn: 'fadeIn 200ms cubic-bezier(0.0, 0, 0.2, 1)',
        fadeOut: 'fadeOut 200ms cubic-bezier(0.4, 0, 1, 1)',
        scaleIn: 'scaleIn 200ms cubic-bezier(0.0, 0, 0.2, 1)',
        scaleOut: 'scaleOut 200ms cubic-bezier(0.4, 0, 1, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
