/**
 * Checkbox Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Checkbox avec l'API MUI Checkbox
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type CheckboxWrapperProps = MuiCheckboxProps;

/**
 * Checkbox wrapper component
 * 
 * Utilise Circuit UI Checkbox quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI Checkbox
 * 
 * Note: Circuit UI n'a pas de composant Checkbox natif, donc on utilise
 * un input HTML natif stylisé avec Circuit UI design tokens
 */
export function CheckboxWrapper({
  checked,
  onChange,
  disabled,
  indeterminate,
  color = 'primary',
  size = 'medium',
  className,
  sx,
  slotProps,
  ...other
}: CheckboxWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Si Circuit UI n'est pas activé, utiliser MUI
  if (!useCircuit) {
    return (
      <Checkbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        indeterminate={indeterminate}
        color={color}
        size={size}
        className={className}
        sx={sx}
        slotProps={slotProps}
        {...other}
      />
    );
  }

  // Utiliser un input checkbox HTML natif avec styles Circuit UI
  // Note: Circuit UI n'a pas de composant Checkbox, donc on utilise HTML natif
  const checkboxSize = size === 'small' ? '16px' : '20px';
  
  const circuitStyles: React.CSSProperties = {
    width: checkboxSize,
    height: checkboxSize,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    accentColor: 'var(--cui-bg-accent)',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Convertir l'événement HTML en événement MUI
      const muiEvent = {
        target: {
          checked: event.target.checked,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(muiEvent, event.target.checked);
    }
  };

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec un input HTML
  const {
    checkedIcon,
    icon,
    indeterminateIcon,
    classes,
    disableRipple,
    centerRipple,
    focusRipple,
    TouchRippleProps,
    inputProps,
    inputRef,
    defaultChecked, // Filtrer defaultChecked car on utilise checked (composant contrôlé)
    ...inputPropsFiltered
  } = other as any;

  return (
    <input
      type="checkbox"
      checked={checked || false}
      onChange={handleChange}
      disabled={disabled}
      ref={(el) => {
        if (el && indeterminate) {
          el.indeterminate = true;
        }
        // Gérer inputRef si fourni
        if (inputRef && typeof inputRef === 'function') {
          inputRef(el);
        } else if (inputRef && typeof inputRef === 'object' && inputRef.current !== undefined) {
          (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
      }}
      className={className}
      style={circuitStyles}
      {...(inputPropsFiltered as React.InputHTMLAttributes<HTMLInputElement>)}
      {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
}

