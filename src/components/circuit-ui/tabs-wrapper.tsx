/**
 * Tabs Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser Circuit UI Tabs avec l'API MUI Tabs
 * pour faciliter la migration progressive.
 */

'use client';

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import type { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import type { TabProps as MuiTabProps } from '@mui/material/Tab';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type TabsWrapperProps = MuiTabsProps;

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
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  if (!useCircuit) {
    return (
      <Tabs value={value} onChange={onChange} className={className} sx={sx} {...other}>
        {children}
      </Tabs>
    );
  }

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
    ...divProps
  } = other as any;

  return (
    <div
      className={className}
      style={circuitStyles}
      role="tablist"
      {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabWrapper) {
          const childProps = child.props as any;
          return React.cloneElement(child, {
            ...childProps,
            selected: childProps.value === value,
            onClick: (e: React.MouseEvent) => {
              if (onChange) {
                onChange(e, childProps.value);
              }
              childProps.onClick?.(e);
            },
          } as any);
        }
        return child;
      })}
    </div>
  );
}

// ----------------------------------------------------------------------

type TabWrapperProps = MuiTabProps & {
  href?: string;
  component?: React.ElementType;
};

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
}: TabWrapperProps & { selected?: boolean; onClick?: (e: React.MouseEvent) => void }) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

  if (!useCircuit) {
    return (
      <Tab
        value={value}
        label={label}
        icon={icon}
        iconPosition={iconPosition}
        className={className}
        sx={sx}
        {...other}
      />
    );
  }

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
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    disableRipple,
    wrapped,
    component,
    href,
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
        style={circuitStyles}
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

