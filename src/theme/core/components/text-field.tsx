import type { Theme } from '@mui/material/styles';
import type { CSSObject } from '@emotion/react';

// Styles minimaux pour les date pickers MUI-X
// Ces styles sont utilisés uniquement par mui-x-date-picker.tsx

export const inputStyles = {
  root: (theme: Theme): CSSObject => ({
    // Styles de base pour l'input
  }),
};

export const inputBaseStyles = {
  root: (type: string, theme: Theme, options?: any): CSSObject => ({
    // Styles de base pour InputBase
  }),
  input: (type: string, theme: Theme): CSSObject => ({
    // Styles pour l'input interne
  }),
};

export const filledInputStyles = {
  root: (theme: Theme, classes?: any): CSSObject => ({
    // Styles pour filled input
  }),
};

export const outlinedInputStyles = {
  root: (theme: Theme, classes?: any): CSSObject => ({
    // Styles pour outlined input
  }),
  notchedOutline: (theme: Theme): CSSObject => ({
    // Styles pour le notched outline
  }),
};

export const inputBaseVariants = {
  input: [],
};

export const filledInputVariants = {
  input: [],
};

export const outlinedInputVariants = {
  input: [],
};

