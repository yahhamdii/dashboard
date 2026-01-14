/**
 * Stack Wrapper - Compatibilité MUI → Tailwind CSS
 * 
 * Wrapper qui permet d'utiliser Tailwind CSS au lieu de MUI Stack
 * pour faciliter la migration progressive.
 */

'use client';

import Stack from '@mui/material/Stack';
import type { StackProps as MuiStackProps } from '@mui/material/Stack';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type StackWrapperProps = MuiStackProps;

/**
 * Stack wrapper component
 * 
 * Utilise Tailwind CSS quand le flag USE_CIRCUIT_LAYOUTS est activé,
 * sinon utilise MUI Stack
 * 
 * Note: Pour l'instant, on garde MUI Stack car la conversion sx → Tailwind
 * nécessite une logique complexe. Cette migration sera faite progressivement
 * en convertissant manuellement les cas simples.
 */
export function StackWrapper({ children, ...other }: StackWrapperProps) {
  const useCircuit = useCircuitLayoutsWithPathname();

  // Pour l'instant, on garde MUI Stack
  // La migration vers Tailwind sera faite manuellement cas par cas
  // car la conversion de sx (MUI) vers className (Tailwind) est complexe
  if (!useCircuit) {
    return <Stack {...other}>{children}</Stack>;
  }

  // TODO: Implémenter la conversion sx → Tailwind
  // Pour l'instant, on garde MUI Stack même avec le flag activé
  // La migration sera progressive et manuelle
  return <Stack {...other}>{children}</Stack>;
}

