/**
 * Input/TextField Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Input avec l'API MUI TextField
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
// import TextField from '@mui/material/TextField';
// import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import { Input as CircuitInput } from '@sumup-oss/circuit-ui';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface InputWrapperProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  label?: React.ReactNode;
  error?: boolean;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  slotProps?: any;
  [key: string]: any;
}

/**
 * Input/TextField wrapper component
 * 
 * Utilise Circuit UI Input quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI TextField (importé dynamiquement)
 */
export function InputWrapper({
  variant = 'outlined',
  size = 'medium',
  label,
  error,
  helperText,
  fullWidth,
  disabled,
  required,
  placeholder,
  value,
  defaultValue,
  onChange,
  className,
  sx,
  slotProps,
  ...other
}: InputWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Utiliser Circuit UI Input
  // Note: Circuit UI Input a une API différente de MUI TextField
  // Il faut adapter les props

  // Circuit UI Input utilise 'invalid' au lieu de 'error'
  const invalid = !!error;

  // Circuit UI Input utilise 'validationHint' au lieu de 'helperText'
  // Convertir ReactNode en string si nécessaire
  const validationHint = error && helperText
    ? (typeof helperText === 'string' ? helperText : String(helperText))
    : undefined;

  // Circuit UI Input n'a pas de prop 'fullWidth', utiliser style
  // Note: sx de MUI ne peut pas être directement converti en style CSS
  // On utilise seulement fullWidth pour l'instant
  const inputStyle: React.CSSProperties | undefined = fullWidth ? { width: '100%' } : undefined;

  // Convertir label en string si nécessaire
  const labelString = label ? (typeof label === 'string' ? label : String(label)) : '';

  // Circuit UI Input exige un label valide (non vide)
  // Si pas de label, utiliser hideLabel et passer un label technique
  const hasLabel = !!labelString && labelString.trim() !== '';

  const {
    InputProps,
    InputLabelProps, // Filter out MUI specific props
    select,
    multiline,
    rows,
    maxRows,
    ...filteredOther
  } = other as any;

  return (
    <div className={className} style={fullWidth ? { width: '100%' } : undefined}>
      <CircuitInput
        label={hasLabel ? labelString : 'Input'} // Circuit UI Input requiert un label non vide
        hideLabel={!hasLabel} // Masquer le label visuellement si on n'en a pas
        invalid={invalid}
        validationHint={validationHint}
        disabled={disabled}
        placeholder={placeholder}
        value={value as string | number | readonly string[] | undefined}
        defaultValue={defaultValue as string | number | readonly string[] | undefined}
        onChange={onChange}
        style={inputStyle}
        // Ne pas passer les props MUI spécifiques qui ne sont pas compatibles
        {...filteredOther}
      />
      {helperText && !error && (
        <div style={{ marginTop: '4px', fontSize: '0.875rem', color: 'var(--cui-fg-subtle)' }}>
          {helperText}
        </div>
      )}
    </div>
  );
}

