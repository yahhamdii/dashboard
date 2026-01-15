/**
 * Box Wrapper - Compatibilité MUI → Tailwind CSS
 *
 * Wrapper qui permet d'utiliser Tailwind CSS au lieu de MUI Box
 * avec une meilleure gestion des props sx.
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

import { convertSxToStyles } from 'src/components/circuit-ui/styles-utils';

export interface BoxWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  component?: React.ElementType;
  sx?: any;
  [key: string]: any;
}

/**
 * Box wrapper component
 */
export function BoxWrapper({
  children,
  className,
  sx,
  component = 'div',
  ...other
}: BoxWrapperProps) {
  const Component = component as any;

  // Convertir sx en styles CSS
  const style = convertSxToStyles(sx);

  // Filtrer les props MUI qui ne sont pas valides pour un élément HTML
  const {
    ref: _ref,
    ...divProps
  } = other as any;

  return (
    <Component className={className} style={style} {...divProps}>
      {children}
    </Component>
  );
}
