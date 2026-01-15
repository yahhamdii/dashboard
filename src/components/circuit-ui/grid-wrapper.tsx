/**
 * Grid Wrapper - Compatibilité MUI → Tailwind CSS Grid
 *
 * Wrapper qui fournit un système de grille 12 colonnes compatible
 * avec l'API MUI Grid en utilisant CSS Grid.
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

// Breakpoints (MUI compatible)
const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Conversion spacing MUI (facteur 8px)
function convertSpacing(value: any): string {
  if (typeof value === 'number') return `${value * 8}px`;
  if (typeof value === 'string') return value;
  return '0px';
}

// Calcul de la largeur en pourcentage pour une grille 12 colonnes
function getColumnWidth(cols: number | 'auto'): string {
  if (cols === 'auto') return 'auto';
  if (cols === 12) return '100%';
  return `${(cols / 12) * 100}%`;
}

// Conversion des props sx en styles CSS
function convertSxToStyles(sx: any): React.CSSProperties {
  if (!sx) return {};

  // Handle array of styles
  if (Array.isArray(sx)) {
    return sx.reduce((acc, item) => ({ ...acc, ...convertSxToStyles(item) }), {});
  }

  if (typeof sx !== 'object') return {};

  const styles: React.CSSProperties = {};

  for (const [key, value] of Object.entries(sx)) {
    if (value === undefined || value === null) continue;
    if (key.startsWith('@') || key.startsWith('&') || key.startsWith('.')) continue;

    // Spacing properties
    if (['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'gap'].includes(key)) {
      const spacingValue = typeof value === 'object' ? (value as any).xs ?? Object.values(value)[0] : value;
      const converted = convertSpacing(spacingValue);

      switch (key) {
        case 'p': styles.padding = converted; break;
        case 'pt': styles.paddingTop = converted; break;
        case 'pb': styles.paddingBottom = converted; break;
        case 'pl': styles.paddingLeft = converted; break;
        case 'pr': styles.paddingRight = converted; break;
        case 'px': styles.paddingLeft = converted; styles.paddingRight = converted; break;
        case 'py': styles.paddingTop = converted; styles.paddingBottom = converted; break;
        case 'm': styles.margin = converted; break;
        case 'mt': styles.marginTop = converted; break;
        case 'mb': styles.marginBottom = converted; break;
        case 'ml': styles.marginLeft = converted; break;
        case 'mr': styles.marginRight = converted; break;
        case 'mx': styles.marginLeft = converted; styles.marginRight = converted; break;
        case 'my': styles.marginTop = converted; styles.marginBottom = converted; break;
        case 'gap': styles.gap = converted; break;
      }
      continue;
    }

    // Direct CSS properties
    if (['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'].includes(key)) {
      const sizeValue = typeof value === 'object' ? (value as any).xs ?? Object.values(value)[0] : value;

      if (typeof sizeValue === 'number') {
        // MUI convention: values <= 1 are percentages, > 1 are pixels
        (styles as any)[key] = sizeValue <= 1 ? `${sizeValue * 100}%` : `${sizeValue}px`;
      } else {
        (styles as any)[key] = sizeValue;
      }
      continue;
    }

    if (key === 'display') {
      styles.display = value as any;
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      (styles as any)[key] = value;
    }
  }

  return styles;
}

// ----------------------------------------------------------------------

export interface GridWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  spacing?: number | string | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  size?: { xs?: number | 'auto'; sm?: number | 'auto'; md?: number | 'auto'; lg?: number | 'auto'; xl?: number | 'auto' };
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  sx?: any;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: string;
  alignItems?: string;
  [key: string]: any;
}

export function GridWrapper({
  children,
  container,
  size,
  spacing = 0,
  className,
  sx,
  xs,
  sm,
  md,
  lg,
  xl,
  direction,
  wrap,
  justifyContent,
  alignItems,
  ...other
}: GridWrapperProps) {
  // Extraire les valeurs de spacing pour chaque breakpoint
  const spacingXs = typeof spacing === 'object' ? (spacing.xs ?? 0) : spacing;
  const spacingSm = typeof spacing === 'object' ? (spacing.sm ?? spacingXs) : spacing;
  const spacingMd = typeof spacing === 'object' ? (spacing.md ?? spacingSm) : spacing;
  const spacingLg = typeof spacing === 'object' ? (spacing.lg ?? spacingMd) : spacing;
  const spacingXl = typeof spacing === 'object' ? (spacing.xl ?? spacingLg) : spacing;

  // Extraire les valeurs de size pour chaque breakpoint
  const sizeXs = size?.xs ?? xs ?? 12;
  const sizeSm = size?.sm ?? sm;
  const sizeMd = size?.md ?? md;
  const sizeLg = size?.lg ?? lg;
  const sizeXl = size?.xl ?? xl;

  // Générer le style CSS pour container
  const containerStyles: React.CSSProperties = container
    ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: convertSpacing(spacingXs),
      width: '100%',
      ...(direction && { gridAutoFlow: direction === 'column' || direction === 'column-reverse' ? 'column' : 'row' }),
    }
    : {};

  // Générer le style CSS pour item (non-container)
  // Générer le style CSS pour item (non-container)
  // Note: On n'applique pas gridColumn via style inline car cela surchargerait les classes Tailwind responsives
  const itemStyles: React.CSSProperties = {};

  // Générer les classes CSS pour les breakpoints responsifs
  const generateResponsiveClasses = (): string => {
    if (container) return '';

    const classes: string[] = [];

    // Base (xs)
    if (sizeXs !== undefined) {
      classes.push(sizeXs === 'auto' ? 'col-auto' : `col-span-${sizeXs}`);
    }

    // sm
    if (sizeSm !== undefined) {
      classes.push(sizeSm === 'auto' ? 'sm:col-auto' : `sm:col-span-${sizeSm}`);
    }

    // md
    if (sizeMd !== undefined) {
      classes.push(sizeMd === 'auto' ? 'md:col-auto' : `md:col-span-${sizeMd}`);
    }

    // lg
    if (sizeLg !== undefined) {
      classes.push(sizeLg === 'auto' ? 'lg:col-auto' : `lg:col-span-${sizeLg}`);
    }

    // xl
    if (sizeXl !== undefined) {
      classes.push(sizeXl === 'auto' ? 'xl:col-auto' : `xl:col-span-${sizeXl}`);
    }

    return classes.join(' ');
  };

  // Générer les classes CSS pour le container avec spacing responsif
  const generateContainerClasses = (): string => {
    if (!container) return '';

    const classes: string[] = ['grid', 'grid-cols-12'];

    // Gap classes
    const gapValue = typeof spacingXs === 'number' ? spacingXs : 0;
    if (gapValue > 0) {
      classes.push(`gap-${gapValue}`);
    }

    return classes.join(' ');
  };

  const sxStyles = convertSxToStyles(sx);

  // Combiner tous les styles
  const combinedStyles: React.CSSProperties = {
    ...containerStyles,
    ...itemStyles,
    ...sxStyles,
  };

  // Combiner toutes les classes
  const combinedClasses = [
    container ? generateContainerClasses() : generateResponsiveClasses(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Filter invalid DOM props
  const {
    columnSpacing,
    rowSpacing,
    zeroMinWidth,
    item,
    ...divProps
  } = other as any;

  return (
    <div className={combinedClasses} style={combinedStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}
