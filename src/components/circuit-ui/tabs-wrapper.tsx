/**
 * Tabs Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Tabs avec l'API MUI Tabs
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface TabsWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: any;
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  scrollButtons?: boolean | 'auto' | 'allow';
  textColor?: 'secondary' | 'primary' | 'inherit';
  indicatorColor?: 'secondary' | 'primary';
  sx?: any;
  [key: string]: any;
}

/**
 * Tabs wrapper component
 * 
 * Utilise un système de tabs natif avec Tailwind quand le flag USE_CIRCUIT_FORMS est activé,
 * sinon utilise MUI Tabs
 */
export function TabsWrapper({
  children,
  value,
  onChange,
  className,
  sx,
  ...other
}: TabsWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Circuit UI n'a pas de composant Tabs natif, utiliser un système natif avec Tailwind
  const circuitStyles: React.CSSProperties = {
    display: 'flex',
    borderBottom: '1px solid var(--cui-border-subtle)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    indicatorColor,
    textColor,
    variant,
    orientation,
    scrollButtons,
    TabIndicatorProps,
    TabScrollButtonProps,
    allowScrollButtonsMobile,
    selectionFollowsFocus,
    ...divProps
  } = other as any;

  return (
    <div
      className={className}
      style={circuitStyles}
      role="tablist"
      {...divProps}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && (child.type === TabWrapper || (child.type as any).displayName === 'TabWrapper')) {
          // Note: checking displayName might be needed if component is wrapped or hot reloaded
          // But child.type === TabWrapper usually works for imports
          const childProps = child.props as any;
          return React.cloneElement(child as React.ReactElement<any>, {
            ...childProps,
            selected: childProps.value === value,
            onClick: (e: React.MouseEvent) => {
              if (onChange) {
                onChange(e, childProps.value);
              }
              childProps.onClick?.(e);
            },
          });
        }
        return child;
      })}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface TabWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: any;
  label?: React.ReactNode;
  icon?: React.ReactElement;
  iconPosition?: 'top' | 'bottom' | 'start' | 'end';
  selected?: boolean;
  sx?: any;
  component?: React.ElementType;
  href?: string;
  [key: string]: any;
}

/**
 * Tab wrapper component
 */
export function TabWrapper({
  children,
  value,
  label,
  icon,
  iconPosition,
  className,
  sx,
  selected,
  onClick,
  ...other
}: TabWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  // Circuit UI n'a pas de composant Tab natif, utiliser un bouton natif avec Tailwind
  const circuitStyles: React.CSSProperties = {
    padding: 'var(--cui-spacings-kilo) var(--cui-spacings-mega)',
    borderBottom: selected ? '2px solid var(--cui-bg-accent)' : '2px solid transparent',
    color: selected ? 'var(--cui-fg-accent)' : 'var(--cui-fg-subtle)',
    fontWeight: selected ? 'var(--cui-font-weight-bold)' : 'var(--cui-font-weight-regular)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: icon ? 'var(--cui-spacings-byte)' : 0,
    flexDirection: iconPosition === 'top' ? 'column' : 'row',
    background: 'none',
    border: 'none', // Reset button styling
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    disableRipple,
    wrapped,
    component,
    href,
    disableFocusRipple,
    ...buttonProps
  } = other as any;

  // Si un component est fourni (comme RouterLink), l'utiliser
  if (component && href) {
    const Component = component as React.ElementType;
    return (
      <Component
        href={href}
        role="tab"
        aria-selected={selected}
        className={className}
        style={{ ...circuitStyles, textDecoration: 'none' }}
        onClick={onClick}
        {...(buttonProps as any)}
      >
        {icon && icon}
        {label && <span>{label}</span>}
        {children}
      </Component>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={className}
      style={circuitStyles}
      onClick={onClick}
      {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && icon}
      {label && <span>{label}</span>}
      {children}
    </button>
  );
}

