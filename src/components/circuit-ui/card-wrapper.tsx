/**
 * Card Wrapper - Compatibilité MUI → Circuit UI / Tailwind
 *
 * Wrapper qui fournit un Card compatible avec l'API MUI Card
 * en utilisant les design tokens et styles CSS.
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

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
    if (key.startsWith('@') || key.startsWith('&') || key.startsWith('.')) continue;

    // Spacing properties
    if (['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py', 'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my'].includes(key)) {
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
      }
      continue;
    }

    // Direct CSS properties
    if (key === 'bgcolor' || key === 'backgroundColor') {
      styles.backgroundColor = value as string;
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      (styles as any)[key] = value;
    }
  }

  return styles;
}

// ----------------------------------------------------------------------

export interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any;
  elevation?: number;
  raised?: boolean;
  [key: string]: any;
}

/**
 * Card wrapper component
 */
export function CardWrapper({
  children,
  className,
  sx,
  elevation,
  raised,
  ...other
}: CardWrapperProps) {
  const baseStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'var(--palette-background-paper)',
    borderRadius: '16px',
    boxShadow: 'var(--customShadows-card)',
    overflow: 'hidden',
  };

  const sxStyles = convertSxToStyles(sx);

  return (
    <div
      className={`card ${className || ''}`}
      style={{ ...baseStyles, ...sxStyles }}
      {...other}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface CardHeaderWrapperProps {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
  sx?: any;
  [key: string]: any;
}

/**
 * CardHeader wrapper component
 */
export function CardHeaderWrapper({
  title,
  subheader,
  action,
  avatar,
  className,
  sx,
  ...other
}: CardHeaderWrapperProps) {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 24px 0',
  };

  const sxStyles = convertSxToStyles(sx);

  // Filter invalid props
  const { classes, disableTypography, titleTypographyProps, subheaderTypographyProps, ...divProps } = other as any;

  return (
    <div
      className={`card-header ${className || ''}`}
      style={{ ...baseStyles, ...sxStyles }}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {avatar && (
        <div style={{ marginRight: '16px', flexShrink: 0 }}>
          {avatar}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <h6 style={{
            margin: 0,
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.5,
            color: 'var(--palette-text-primary)',
          }}>
            {title}
          </h6>
        )}
        {subheader && (
          <p style={{
            margin: '4px 0 0',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57,
            color: 'var(--palette-text-secondary)',
          }}>
            {subheader}
          </p>
        )}
      </div>
      {action && (
        <div style={{ marginLeft: '16px', flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface CardContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any;
  [key: string]: any;
}

/**
 * CardContent wrapper component
 */
export function CardContentWrapper({
  children,
  className,
  sx,
  ...other
}: CardContentWrapperProps) {
  const baseStyles: React.CSSProperties = {
    padding: '24px',
  };

  const sxStyles = convertSxToStyles(sx);

  // Filter invalid props
  const { classes, component, ...divProps } = other as any;

  return (
    <div
      className={`card-content ${className || ''}`}
      style={{ ...baseStyles, ...sxStyles }}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface CardActionsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any;
  disableSpacing?: boolean;
  [key: string]: any;
}

/**
 * CardActions wrapper component
 */
export function CardActionsWrapper({
  children,
  className,
  sx,
  disableSpacing,
  ...other
}: CardActionsWrapperProps) {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: disableSpacing ? '8px' : '8px 24px 24px',
    gap: disableSpacing ? '0' : '8px',
  };

  const sxStyles = convertSxToStyles(sx);

  // Filter invalid props
  const { classes, ...divProps } = other as any;

  return (
    <div
      className={`card-actions ${className || ''}`}
      style={{ ...baseStyles, ...sxStyles }}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface CardMediaWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  component?: 'img' | 'div';
  alt?: string;
  sx?: any;
  [key: string]: any;
}

/**
 * CardMedia wrapper component
 */
export function CardMediaWrapper({
  image,
  component = 'div',
  alt,
  className,
  sx,
  children,
  ...other
}: CardMediaWrapperProps) {
  const baseStyles: React.CSSProperties = {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    ...(image && component === 'div' ? { backgroundImage: `url(${image})` } : {}),
  };

  const sxStyles = convertSxToStyles(sx);

  // Filter invalid props
  const { classes, ...divProps } = other as any;

  if (component === 'img' && image) {
    return (
      <img
        src={image}
        alt={alt || ''}
        className={`card-media ${className || ''}`}
        style={{ ...baseStyles, ...sxStyles, width: '100%', display: 'block' }}
        {...(divProps as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  return (
    <div
      className={`card-media ${className || ''}`}
      style={{ ...baseStyles, ...sxStyles }}
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}
