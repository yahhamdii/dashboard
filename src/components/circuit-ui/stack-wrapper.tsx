/**
 * Stack Wrapper - Compatibilité MUI → Tailwind CSS
 * 
 * Wrapper qui permet d'utiliser Tailwind CSS au lieu de MUI Stack
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';

// import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface StackWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  spacing?: number | string | object;
  alignItems?: string;
  justifyContent?: string;
  sx?: any;
  component?: React.ElementType;
  divider?: React.ReactNode;
  [key: string]: any;
}

/**
 * Stack wrapper component
 */
export function StackWrapper({
  children,
  direction = 'column',
  spacing = 0,
  alignItems,
  justifyContent,
  sx,
  component,
  divider,
  className,
  ...other
}: StackWrapperProps) {
  // const useCircuit = useCircuitLayoutsWithPathname();

  const gapValue = typeof spacing === 'number' ? `${spacing * 8}px` : (typeof spacing === 'string' ? spacing : '0px');

  const circuitStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    gap: gapValue,
    alignItems: alignItems,
    justifyContent: justifyContent,
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  const Component = component || 'div';

  // Remove MUI props
  const {
    useFlexGap,
    ...domProps
  } = other as any;

  // Manual divider implementation if needed
  // This simplistic implementation doesn't strictly support the 'divider' prop behavior of MUI Stack (injecting between children)
  // For a perfect output we would need to interleave children with divider.
  // For now, ignoring divider to keep it simple, or we can deal with it later if visual regressions appear.

  return (
    <Component className={`stack ${className || ''}`} style={circuitStyles} {...domProps}>
      {children}
    </Component>
  );
}

