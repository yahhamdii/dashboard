/**
 * Input/TextField Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Input avec l'API MUI TextField
 * pour faciliter la migration progressive.
 */

'use client';

import TextField from '@mui/material/TextField';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import { Input as CircuitInput } from '@sumup-oss/circuit-ui';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type InputWrapperProps = Omit<MuiTextFieldProps, 'variant' | 'size'> & {
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
};

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
  ...other
}: InputWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Si Circuit UI n'est pas activé, utiliser MUI
  if (!useCircuit) {
    return (
      <TextField
        variant={variant}
        size={size}
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={className}
        sx={sx}
        {...other}
      />
    );
  }

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

  return (
    <div className={className} style={fullWidth ? { width: '100%' } : undefined}>
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          {label}
          {required && <span style={{ color: 'var(--cui-fg-danger)' }}> *</span>}
        </label>
      )}
      <CircuitInput
        label={label ? (typeof label === 'string' ? label : String(label)) : ''} // Circuit UI Input requiert label (string)
        invalid={invalid}
        validationHint={validationHint}
        disabled={disabled}
        placeholder={placeholder}
        value={value as string | number | readonly string[] | undefined}
        defaultValue={defaultValue as string | number | readonly string[] | undefined}
        onChange={onChange}
        style={inputStyle}
        // Ne pas passer les props MUI spécifiques qui ne sont pas compatibles
        // {...other} // Commenté pour éviter les conflits de types
      />
      {helperText && !error && (
        <div style={{ marginTop: '4px', fontSize: '0.875rem', color: 'var(--cui-fg-subtle)' }}>
          {helperText}
        </div>
      )}
    </div>
  );
}

