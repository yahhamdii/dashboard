/**
 * Types partagés pour les mixins
 * Remplace les types MUI par des types génériques
 */

export type CSSObject = Record<string, any>;

export type Theme = {
  typography: {
    body2: CSSObject;
    caption?: CSSObject;
    [key: string]: CSSObject | undefined;
  };
  spacing: (value: number) => string;
  shape: {
    borderRadius: number;
  };
  vars: {
    palette: {
      action: {
        selected: string;
        hover: string;
      };
      background: {
        paperChannel: string;
        defaultChannel: string;
      };
      common: {
        white: string;
        black: string;
      };
      grey: Record<number, string>;
      text?: {
        primary?: string;
        disabledChannel?: string;
      };
      [key: string]: any;
    };
    customShadows?: {
      z8: string;
      dropdown: string;
    };
  };
  applyStyles: (mode: 'dark' | 'light', styles: CSSObject) => CSSObject;
  breakpoints?: {
    keys: string[];
    up: (key: string) => string;
  };
  [key: string]: any;
};

