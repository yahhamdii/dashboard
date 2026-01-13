/**
 * Box Wrapper - Compatibilité MUI → Tailwind CSS
 * 
 * Wrapper qui permet d'utiliser Tailwind CSS au lieu de MUI Box
 * pour faciliter la migration progressive.
 */

'use client';

import Box from '@mui/material/Box';
import type { BoxProps as MuiBoxProps } from '@mui/material/Box';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type BoxWrapperProps = MuiBoxProps;

/**
 * Box wrapper component
 * 
 * Utilise Tailwind CSS quand le flag USE_CIRCUIT_LAYOUTS est activé,
 * sinon utilise MUI Box
 * 
 * Note: Pour l'instant, on garde MUI Box car la conversion sx → Tailwind
 * nécessite une logique complexe. Cette migration sera faite progressivement
 * en convertissant manuellement les cas simples.
 */
export function BoxWrapper({ children, ...other }: BoxWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

  // Pour l'instant, on garde MUI Box
  // La migration vers Tailwind sera faite manuellement cas par cas
  // car la conversion de sx (MUI) vers className (Tailwind) est complexe
  if (!useCircuit) {
    return <Box {...other}>{children}</Box>;
  }

  // TODO: Implémenter la conversion sx → Tailwind
  // Pour l'instant, on garde MUI Box même avec le flag activé
  // La migration sera progressive et manuelle
  return <Box {...other}>{children}</Box>;
}

