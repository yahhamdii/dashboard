/**
 * Switch Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Switch avec l'API MUI Switch
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
// import Switch from '@mui/material/Switch';
// import type { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface SwitchWrapperProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  size?: 'small' | 'medium';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  sx?: any;
  slotProps?: any;
  [key: string]: any;
}

/**
 * Switch wrapper component
 * 
 * Utilise Circuit UI Switch quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI Switch
 * 
 * Note: Circuit UI n'a pas de composant Switch natif, donc on utilise
 * un input HTML natif stylisé avec Circuit UI design tokens
 */
export function SwitchWrapper({
  checked,
  onChange,
  disabled,
  color = 'primary',
  size = 'medium',
  className,
  sx,
  slotProps,
  ...other
}: SwitchWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Utiliser un input switch HTML natif avec styles Circuit UI
  // Note: Circuit UI n'a pas de composant Switch, donc on utilise HTML natif
  const switchWidth = size === 'small' ? '36px' : '44px';
  const switchHeight = size === 'small' ? '20px' : '24px';

  const circuitStyles: React.CSSProperties = {
    width: switchWidth,
    height: switchHeight,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    // Utiliser les design tokens Circuit UI pour le style
    // Note: Le style natif du switch HTML est limité, on utilise CSS custom
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Convertir l'événement HTML en événement MUI
      const muiEvent = {
        target: {
          checked: event.target.checked,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange(muiEvent, event.target.checked as any);
    }
  };

  // Exclude MUI props
  const {
    centerRipple,
    disableRipple,
    disableFocusRipple,
    disableTouchRipple,
    focusRipple,
    focusVisibleClassName,
    ...domProps
  } = other as any;

  // Pour un meilleur rendu, on utilise un div stylisé comme switch
  // car l'input type="checkbox" avec appearance: none nécessite plus de CSS
  return (
    <label
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: switchWidth,
        height: switchHeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked || false}
        onChange={handleChange}
        disabled={disabled}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
        }}
        {...domProps}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: checked ? 'var(--cui-bg-accent)' : 'var(--cui-bg-subtle)',
          borderRadius: '12px',
          transition: 'background-color 0.2s',
          ...circuitStyles,
        }}
      >
        <span
          style={{
            position: 'absolute',
            content: '""',
            height: size === 'small' ? '16px' : '20px',
            width: size === 'small' ? '16px' : '20px',
            left: checked ? (size === 'small' ? '18px' : '22px') : '2px',
            bottom: '2px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </span>
    </label>
  );
}




