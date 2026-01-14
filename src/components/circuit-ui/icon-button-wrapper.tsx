/**
 * IconButton Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser un IconButton natif avec Tailwind CSS
 * au lieu de MUI IconButton pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
// import IconButton from '@mui/material/IconButton';
// import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface IconButtonWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: any;
  edge?: any;
  [key: string]: any;
}

/**
 * IconButton wrapper component
 * 
 * Utilise un bouton natif avec Tailwind quand le flag USE_CIRCUIT_BUTTONS est activé,
 * sinon utilise MUI IconButton
 */
export function IconButtonWrapper({
  children,
  size = 'medium',
  color = 'default',
  disabled,
  className,
  sx,
  ...other
}: IconButtonWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');

  // Circuit UI n'a pas de composant IconButton natif, utiliser un bouton natif avec Tailwind
  const sizeClasses = size === 'small' ? 'w-8 h-8' :
    size === 'large' ? 'w-12 h-12' :
      'w-10 h-10';

  const colorClasses = color === 'primary' ? 'text-blue-600 hover:bg-blue-50' :
    color === 'secondary' ? 'text-purple-600 hover:bg-purple-50' :
      color === 'error' ? 'text-red-600 hover:bg-red-50' :
        color === 'warning' ? 'text-orange-600 hover:bg-orange-50' :
          color === 'info' ? 'text-cyan-600 hover:bg-cyan-50' :
            color === 'success' ? 'text-green-600 hover:bg-green-50' :
              'text-gray-600 hover:bg-gray-100';

  const circuitStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    disableRipple,
    centerRipple,
    focusRipple,
    TouchRippleProps,
    edge,
    ...buttonProps
  } = other as any;

  return (
    <button
      type="button"
      className={`${sizeClasses} ${colorClasses} ${className || ''}`}
      style={circuitStyles}
      disabled={disabled}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}




