/**
 * Tooltip Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser un Tooltip natif avec Tailwind CSS
 * au lieu de MUI Tooltip pour faciliter la migration progressive.
 */

'use client';

import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import type { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type TooltipWrapperProps = MuiTooltipProps;

/**
 * Tooltip wrapper component
 * 
 * Utilise un tooltip natif avec Tailwind quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI Tooltip
 */
export function TooltipWrapper({
  children,
  title,
  placement = 'top',
  arrow = false,
  className,
  sx,
  ...other
}: TooltipWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  if (!useCircuit || !title) {
    return (
      <Tooltip title={title} placement={placement} arrow={arrow} className={className} sx={sx} {...other}>
        {children}
      </Tooltip>
    );
  }

  // Circuit UI n'a pas de composant Tooltip natif, utiliser un tooltip natif avec Tailwind
  const [isVisible, setIsVisible] = useState(false);

  // Convertir placement MUI vers classes Tailwind
  const placementMap: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  const placementClasses = placementMap[placement || 'top'] || placementMap.top;

  const arrowMap: Record<string, string> = {
    top: 'after:border-t-gray-900 after:top-full after:left-1/2 after:-translate-x-1/2',
    bottom: 'after:border-b-gray-900 after:bottom-full after:left-1/2 after:-translate-x-1/2',
    left: 'after:border-l-gray-900 after:left-full after:top-1/2 after:-translate-y-1/2',
    right: 'after:border-r-gray-900 after:right-full after:top-1/2 after:-translate-y-1/2',
  };
  const arrowClasses = arrow ? (arrowMap[placement || 'top'] || arrowMap.top) : '';

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg ${placementClasses} ${arrowClasses} ${className || ''}`}
          role="tooltip"
        >
          {title}
        </div>
      )}
    </div>
  );
}

