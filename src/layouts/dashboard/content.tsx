'use client';

import React from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { ContainerWrapper } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { useSettingsContext } from 'src/components/settings';

import { layoutClasses } from '../core';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ----------------------------------------------------------------------

export type DashboardContentProps = React.ComponentProps<typeof ContainerWrapper> & {
  layoutQuery?: Breakpoint;
  disablePadding?: boolean;
};

export function DashboardContent({
  sx,
  children,
  className,
  disablePadding,
  maxWidth = 'lg',
  layoutQuery = 'lg',
  style,
  ...other
}: DashboardContentProps) {
  const settings = useSettingsContext();

  const isNavHorizontal = settings.state.navLayout === 'horizontal';

  const breakpointValue = tokens.breakpoints.values[layoutQuery] || tokens.breakpoints.values.lg;
  const contentId = React.useId();

  React.useEffect(() => {
    const styleId = `dashboard-content-${contentId}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      [data-dashboard-content="${contentId}"] {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        padding-top: var(--layout-dashboard-content-pt);
        padding-bottom: var(--layout-dashboard-content-pb);
      }
      @media (min-width: ${breakpointValue}px) {
        [data-dashboard-content="${contentId}"] {
          padding-left: var(--layout-dashboard-content-px);
          padding-right: var(--layout-dashboard-content-px);
        }
        ${isNavHorizontal ? `[data-dashboard-content="${contentId}"] { --layout-dashboard-content-pt: 40px; }` : ''}
      }
    `;

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [breakpointValue, contentId, isNavHorizontal]);

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const finalStyles: React.CSSProperties = {
    ...(disablePadding && { padding: 0 }),
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <ContainerWrapper
      data-dashboard-content={contentId}
      className={mergeClasses([layoutClasses.content, className])}
      maxWidth={settings.state.compactLayout ? maxWidth : false}
      style={finalStyles}
      {...other}
    >
      {children}
    </ContainerWrapper>
  );
}

// ----------------------------------------------------------------------

export const VerticalDivider: React.FC<React.ComponentProps<'span'>> = ({ className, ...other }) => {
  const styles: React.CSSProperties = {
    width: 1,
    height: 10,
    flexShrink: 0,
    display: 'none',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: tokens.spacing(2.5),
    marginRight: tokens.spacing(2.5),
    backgroundColor: 'currentColor',
    color: tokens.colors.divider,
  };

  return (
    <span className={className} style={styles} {...other}>
      <span
        style={{
          top: -5,
          width: 3,
          height: 3,
          content: '""',
          flexShrink: 0,
          borderRadius: '50%',
          position: 'absolute',
          backgroundColor: 'currentColor',
        }}
      />
      <span
        style={{
          bottom: -5,
          top: 'auto',
          width: 3,
          height: 3,
          content: '""',
          flexShrink: 0,
          borderRadius: '50%',
          position: 'absolute',
          backgroundColor: 'currentColor',
        }}
      />
    </span>
  );
};
