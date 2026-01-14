/**
 * Avatar Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser un Avatar natif avec Tailwind CSS
 * au lieu de MUI Avatar pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
import Avatar from '@mui/material/Avatar';
import type { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type AvatarWrapperProps = MuiAvatarProps;

/**
 * Avatar wrapper component
 * 
 * Utilise un avatar natif avec Tailwind quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI Avatar
 */
export function AvatarWrapper({
  children,
  src,
  alt,
  size = 'medium',
  className,
  sx,
  ...other
}: AvatarWrapperProps & { size?: 'small' | 'medium' | 'large' }) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  if (!useCircuit) {
    return (
      <Avatar src={src} alt={alt} className={className} sx={sx} {...other}>
        {children}
      </Avatar>
    );
  }

  // Circuit UI n'a pas de composant Avatar natif, utiliser un div avec Tailwind
  const sizeClasses = size === 'small' ? 'w-8 h-8 text-xs' :
                     size === 'large' ? 'w-16 h-16 text-lg' :
                     'w-10 h-10 text-sm';

  const circuitStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'var(--cui-bg-subtle)',
    color: 'var(--cui-fg-normal)',
    fontWeight: 'var(--cui-font-weight-bold)',
    overflow: 'hidden',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    variant,
    imgProps,
    ...divProps
  } = other as any;

  if (src) {
    return (
      <div
        className={`${sizeClasses} ${className || ''}`}
        style={circuitStyles}
        {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} ${className || ''}`}
      style={circuitStyles}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}



