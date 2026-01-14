/**
 * Container Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser un Container avec Tailwind CSS
 * au lieu de MUI Container pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
// import Container from '@mui/material/Container';
// import type { ContainerProps as MuiContainerProps } from '@mui/material/Container';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface ContainerWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  component?: React.ElementType;
  sx?: any;
  [key: string]: any;
}

/**
 * Container wrapper component
 */
export function ContainerWrapper({
  children,
  maxWidth = 'lg',
  className,
  sx,
  component,
  ...other
}: ContainerWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

  // Si un component est fourni (comme MotionContainer), l'utiliser comme wrapper
  if (component) {
    const Component = component as React.ElementType;
    return (
      <Component className={className} style={sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}} {...other}>
        {children}
      </Component>
    );
  }

  // Convertir maxWidth MUI vers classes Tailwind
  const maxWidthClass = maxWidth === false ? 'max-w-none' :
    maxWidth === 'xs' ? 'max-w-screen-xs' :
      maxWidth === 'sm' ? 'max-w-screen-sm' :
        maxWidth === 'md' ? 'max-w-screen-md' :
          maxWidth === 'lg' ? 'max-w-screen-lg' :
            maxWidth === 'xl' ? 'max-w-screen-xl' :
              'max-w-screen-lg';

  const circuitStyles: React.CSSProperties = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'var(--cui-spacings-mega)',
    paddingRight: 'var(--cui-spacings-mega)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    disableGutters,
    fixed,
    ...divProps
  } = other as any;

  return (
    <div
      className={`${maxWidthClass} ${className || ''}`}
      style={circuitStyles}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

