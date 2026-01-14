/**
 * Box Wrapper - Compatibilité MUI → Tailwind CSS
 *
 * Wrapper qui permet d'utiliser Tailwind CSS au lieu de MUI Box
 * avec une meilleure gestion des props sx.
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

// Breakpoints MUI → valeurs en pixels
const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Conversion spacing MUI (facteur 8px)
function convertSpacing(value: any): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `${value * 8}px`;
  if (typeof value === 'string') return value;
  return undefined;
}

// Conversion des props sx en styles CSS
function convertSxToStyles(sx: any): React.CSSProperties {
  if (!sx || typeof sx !== 'object' || Array.isArray(sx)) return {};

  const styles: React.CSSProperties = {};

  for (const [key, value] of Object.entries(sx)) {
    if (value === undefined || value === null) continue;

    // Ignorer les clés de breakpoint et les sélecteurs CSS
    if (key.startsWith('@') || key.startsWith('&') || key.startsWith('.')) continue;

    // Propriétés de spacing
    if (['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'gap', 'rowGap', 'columnGap'].includes(key)) {
      const spacingValue = typeof value === 'object' ? (value as any).xs ?? Object.values(value)[0] : value;
      const converted = convertSpacing(spacingValue);

      switch (key) {
        case 'p': styles.padding = converted; break;
        case 'pt': styles.paddingTop = converted; break;
        case 'pb': styles.paddingBottom = converted; break;
        case 'pl': styles.paddingLeft = converted; break;
        case 'pr': styles.paddingRight = converted; break;
        case 'px':
          styles.paddingLeft = converted;
          styles.paddingRight = converted;
          break;
        case 'py':
          styles.paddingTop = converted;
          styles.paddingBottom = converted;
          break;
        case 'm': styles.margin = converted; break;
        case 'mt': styles.marginTop = converted; break;
        case 'mb': styles.marginBottom = converted; break;
        case 'ml': styles.marginLeft = converted; break;
        case 'mr': styles.marginRight = converted; break;
        case 'mx':
          styles.marginLeft = converted;
          styles.marginRight = converted;
          break;
        case 'my':
          styles.marginTop = converted;
          styles.marginBottom = converted;
          break;
        case 'gap': styles.gap = converted; break;
        case 'rowGap': styles.rowGap = converted; break;
        case 'columnGap': styles.columnGap = converted; break;
      }
      continue;
    }

    // Propriétés de taille
    if (['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'].includes(key)) {
      const sizeValue = typeof value === 'object' ? (value as any).xs ?? Object.values(value)[0] : value;
      (styles as any)[key] = typeof sizeValue === 'number' ? `${sizeValue}px` : sizeValue;
      continue;
    }

    // Propriétés de couleur
    if (key === 'bgcolor' || key === 'backgroundColor') {
      styles.backgroundColor = value as string;
      continue;
    }
    if (key === 'color') {
      styles.color = value as string;
      continue;
    }

    // Propriétés flexbox
    if (['display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignContent', 'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'order'].includes(key)) {
      (styles as any)[key] = value;
      continue;
    }

    // Propriétés de position
    if (['position', 'top', 'right', 'bottom', 'left', 'zIndex'].includes(key)) {
      (styles as any)[key] = typeof value === 'number' && ['top', 'right', 'bottom', 'left'].includes(key) ? `${value}px` : value;
      continue;
    }

    // Propriétés de bordure et ombre
    if (['borderRadius', 'border', 'borderTop', 'borderBottom', 'borderLeft', 'borderRight', 'borderColor', 'borderWidth', 'borderStyle', 'boxShadow'].includes(key)) {
      (styles as any)[key] = typeof value === 'number' && key === 'borderRadius' ? `${value}px` : value;
      continue;
    }

    // Propriétés de texte
    if (['textAlign', 'textTransform', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing', 'textDecoration', 'fontFamily'].includes(key)) {
      (styles as any)[key] = value;
      continue;
    }

    // Overflow
    if (['overflow', 'overflowX', 'overflowY'].includes(key)) {
      (styles as any)[key] = value;
      continue;
    }

    // Opacity et visibility
    if (['opacity', 'visibility'].includes(key)) {
      (styles as any)[key] = value;
      continue;
    }

    // Transition et transform
    if (['transition', 'transform'].includes(key)) {
      (styles as any)[key] = value;
      continue;
    }

    // Grid properties
    if (['gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow', 'gridArea', 'gridGap', 'gridAutoFlow', 'gridAutoColumns', 'gridAutoRows'].includes(key)) {
      (styles as any)[key] = value;
      continue;
    }

    // Autres propriétés CSS directes
    if (typeof value === 'string' || typeof value === 'number') {
      (styles as any)[key] = value;
    }
  }

  return styles;
}

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
