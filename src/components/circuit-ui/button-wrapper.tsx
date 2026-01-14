/**
 * Button Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Button avec l'API MUI
 * pour faciliter la migration progressive.
 */

'use client';

// import Button from '@mui/material/Button';
// import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { Button as CircuitButton } from '@sumup-oss/circuit-ui';

// import { useCircuitComponent } from 'src/lib/feature-flags';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export interface ButtonWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text' | 'soft';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  component?: React.ElementType;
  href?: string;
  sx?: any;
  loading?: boolean;
  [key: string]: any;
}

/**
 * Mapping MUI Button variants → Circuit UI variants
 */
function mapVariant(muiVariant: string): 'primary' | 'secondary' | 'tertiary' {
  switch (muiVariant) {
    case 'contained':
      return 'primary';
    case 'outlined':
      return 'secondary';
    case 'text':
    case 'soft':
      return 'tertiary';
    default:
      return 'secondary';
  }
}

/**
 * Mapping MUI Button sizes → Circuit UI sizes
 */
function mapSize(muiSize: string): 's' | 'm' {
  switch (muiSize) {
    case 'small':
      return 's';
    case 'medium':
    case 'large':
    default:
      return 'm';
  }
}

/**
 * Button wrapper component
 * 
 * Utilise Circuit UI quand le flag USE_CIRCUIT_BUTTONS est activé,
 * sinon utilise MUI Button (importé dynamiquement)
 */
export function ButtonWrapper({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  children,
  startIcon,
  endIcon,
  component,
  href,
  className,
  sx,
  ...other
}: ButtonWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');
  const { currentLang } = useTranslate();

  // Mapper la locale de l'app vers le format Circuit UI (ex: 'fr' -> 'fr-FR')
  const circuitLocale = currentLang?.value === 'fr' ? 'fr-FR' :
    currentLang?.value === 'en' ? 'en-US' :
      currentLang?.value === 'vi' ? 'vi-VN' :
        currentLang?.value === 'cn' ? 'zh-CN' :
          currentLang?.value === 'ar' ? 'ar-SA' : 'en-US';

  // Utiliser Circuit UI
  const circuitVariant = mapVariant(variant);
  const circuitSize = mapSize(size);

  // Circuit UI utilise 'as' au lieu de 'component'
  const asProp = component || (href ? 'a' : undefined);

  // Circuit UI utilise 'icon' au lieu de 'startIcon'
  // Note: Circuit UI attend un IconComponentType, pas un ReactNode
  // Pour l'instant, on ne supporte pas les icônes dans Circuit UI via ce wrapper
  // Il faudrait convertir startIcon en IconComponentType si nécessaire
  const icon = undefined; // TODO: Convertir startIcon en IconComponentType si nécessaire

  // Convertir sx (MUI) en style (Circuit UI)
  const style = sx ? (typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}) : undefined;

  // Gérer destructive pour error color
  const destructive = color === 'error';

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec Circuit UI Button
  const {
    loading, // MUI Button prop - Circuit UI n'a pas de prop loading directe
    disableElevation, // MUI specific prop
    disableRipple, // MUI specific prop
    focusRipple, // MUI specific prop
    centerRipple, // MUI specific prop
    TouchRippleProps, // MUI specific prop
    ...circuitOtherProps
  } = other as any;

  // Props pour Circuit UI
  const circuitProps: any = {
    variant: circuitVariant,
    size: circuitSize,
    destructive,
    className,
    style,
    locale: circuitLocale, // Fixe la locale pour éviter les erreurs d'hydratation
    ...circuitOtherProps,
  };

  if (asProp) {
    circuitProps.as = asProp;
  }
  if (href) {
    circuitProps.href = href;
  }
  if (icon) {
    circuitProps.icon = icon;
  }

  return <CircuitButton {...circuitProps}>{children}</CircuitButton>;
}

