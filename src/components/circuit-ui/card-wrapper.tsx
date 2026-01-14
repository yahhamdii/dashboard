/**
 * Card Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser un Card compatible Circuit UI avec l'API MUI Card
 * pour faciliter la migration progressive.
 * 
 * Note: Circuit UI n'a pas de composant Card direct, donc on utilise un div
 * avec des styles basés sur les design tokens de Circuit UI.
 */

'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { CardHeaderProps as MuiCardHeaderProps } from '@mui/material/CardHeader';
import type { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';
import type { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type CardWrapperProps = MuiCardProps;

/**
 * Card wrapper component
 * 
 * Utilise un div avec styles Circuit UI quand le flag USE_CIRCUIT_CARDS est activé,
 * sinon utilise MUI Card
 */
export function CardWrapper({
  children,
  className,
  sx,
  ...other
}: CardWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_CARDS');

  // Si Circuit UI n'est pas activé, utiliser MUI
  if (!useCircuit) {
    return (
      <Card className={className} sx={sx} {...other}>
        {children}
      </Card>
    );
  }

  // Utiliser un div avec styles Circuit UI
  // Circuit UI utilise des design tokens pour les ombres, bordures, etc.
  const circuitStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'var(--cui-bg-normal)',
    borderRadius: 'var(--cui-border-radius-mega)',
    boxShadow: 'var(--cui-shadow-mega)',
    border: '1px solid var(--cui-border-subtle)',
    // Convertir sx en styles si nécessaire
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec un div
  const {
    elevation, // MUI specific prop
    raised, // MUI specific prop
    ...divProps
  } = other as any;

  return (
    <div className={className} style={circuitStyles} {...divProps}>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

type CardHeaderWrapperProps = MuiCardHeaderProps;

/**
 * CardHeader wrapper component
 */
export function CardHeaderWrapper({
  className,
  sx,
  ...other
}: CardHeaderWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_CARDS');

  if (!useCircuit) {
    return <CardHeader className={className} sx={sx} {...other} />;
  }

  // Circuit UI n'a pas de CardHeader, utiliser un div avec styles
  const circuitStyles: React.CSSProperties = {
    padding: 'var(--cui-spacings-giga) var(--cui-spacings-giga) 0',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec un div
  const {
    action,
    avatar,
    title,
    subheader,
    classes,
    disableTypography,
    ...divProps
  } = other as any;

  return <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)} />;
}

// ----------------------------------------------------------------------

type CardContentWrapperProps = MuiCardContentProps;

/**
 * CardContent wrapper component
 */
export function CardContentWrapper({
  className,
  sx,
  ...other
}: CardContentWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_CARDS');

  if (!useCircuit) {
    return <CardContent className={className} sx={sx} {...other} />;
  }

  // Circuit UI n'a pas de CardContent, utiliser un div avec styles
  const circuitStyles: React.CSSProperties = {
    padding: 'var(--cui-spacings-giga)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec un div
  const {
    classes,
    component,
    ...divProps
  } = other as any;

  return <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)} />;
}

// ----------------------------------------------------------------------

type CardActionsWrapperProps = MuiCardActionsProps;

/**
 * CardActions wrapper component
 */
export function CardActionsWrapper({
  className,
  sx,
  ...other
}: CardActionsWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_CARDS');

  if (!useCircuit) {
    return <CardActions className={className} sx={sx} {...other} />;
  }

  // Circuit UI n'a pas de CardActions, utiliser un div avec styles
  const circuitStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--cui-spacings-kilo) var(--cui-spacings-giga)',
    gap: 'var(--cui-spacings-kilo)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec un div
  const {
    classes,
    disableSpacing,
    ...divProps
  } = other as any;

  return <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)} />;
}

