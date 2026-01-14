/**
 * Select Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Select avec l'API MUI Select
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
import Select from '@mui/material/Select';
import type { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type SelectWrapperProps = MuiSelectProps;

/**
 * Select wrapper component
 * 
 * Utilise Circuit UI Select quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI Select
 * 
 * Note: Circuit UI n'a pas de composant Select natif, donc on utilise
 * un select HTML natif stylisé avec Circuit UI design tokens
 */
export function SelectWrapper({
  children,
  value,
  onChange,
  label,
  error,
  disabled,
  fullWidth,
  multiple,
  displayEmpty,
  renderValue,
  className,
  sx,
  slotProps,
  ...other
}: SelectWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Si Circuit UI n'est pas activé, utiliser MUI
  if (!useCircuit) {
    return (
      <Select
        value={value}
        onChange={onChange}
        label={label}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
        multiple={multiple}
        displayEmpty={displayEmpty}
        renderValue={renderValue}
        className={className}
        sx={sx}
        slotProps={slotProps}
        {...other}
      >
        {children}
      </Select>
    );
  }

  // Utiliser un select HTML natif avec styles Circuit UI
  // Note: Circuit UI n'a pas de composant Select, donc on utilise HTML natif
  const circuitStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    padding: '12px 16px',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'var(--cui-fg-normal)',
    backgroundColor: 'var(--cui-bg-normal)',
    border: `1px solid ${error ? 'var(--cui-border-danger)' : 'var(--cui-border-subtle)'}`,
    borderRadius: 'var(--cui-border-radius-mega)',
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      // Convertir l'événement HTML en événement MUI
      const muiEvent = {
        target: {
          value: multiple
            ? Array.from(event.target.selectedOptions, (option) => option.value)
            : event.target.value,
        },
      } as React.ChangeEvent<{ value: unknown }>;
      
      onChange(muiEvent as any, other as any);
    }
  };

  // Pour l'instant, on garde MUI Select car:
  // 1. Circuit UI n'a pas de composant Select natif
  // 2. Le select HTML natif est limité (pas de renderValue, multiple complexe, etc.)
  // 3. MUI Select offre beaucoup plus de fonctionnalités
  // 
  // TODO: Implémenter un vrai composant Select avec Circuit UI design tokens
  // ou utiliser une bibliothèque tierce compatible Circuit UI
  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
      error={error}
      disabled={disabled}
      fullWidth={fullWidth}
      multiple={multiple}
      displayEmpty={displayEmpty}
      renderValue={renderValue}
      className={className}
      sx={[
        useCircuit
          ? {
              // Appliquer les styles Circuit UI via sx
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? 'var(--cui-border-danger)' : 'var(--cui-border-subtle)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? 'var(--cui-border-danger)' : 'var(--cui-border-normal)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? 'var(--cui-border-danger)' : 'var(--cui-border-accent)',
                borderWidth: '2px',
              },
            }
          : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      slotProps={slotProps}
      {...other}
    >
      {children}
    </Select>
  );
}

