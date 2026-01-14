'use client';

import React, { useEffect } from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { layoutClasses } from './classes';
import { layoutSectionVars } from './css-vars';

// ----------------------------------------------------------------------

export type LayoutSectionProps = React.ComponentProps<'div'> & {
  sx?: any;
  cssVars?: Record<string, any>;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

// Simple GlobalStyles replacement
function GlobalStyles({ styles }: { styles: () => Record<string, any> }) {
  useEffect(() => {
    const styleId = 'layout-section-global-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const cssVars = styles();
    const bodyStyles = cssVars.body || {};
    const cssText = `body { ${Object.entries(bodyStyles).map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    }).join(' ')} }`;

    styleElement.textContent = cssText;

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
}

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
  className,
  style,
  ...other
}: LayoutSectionProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const rootStyles: React.CSSProperties = {
    ...sxStyles,
    ...(style || {}),
  };

  const sidebarContainerStyles: React.CSSProperties = {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
  };

  return (
    <>
      <GlobalStyles styles={() => ({ body: { ...layoutSectionVars({} as any), ...cssVars } })} />

      <div
        id="root__layout"
        className={mergeClasses([layoutClasses.root, className])}
        style={rootStyles}
        {...other}
      >
        {sidebarSection ? (
          <>
            {sidebarSection}
            <div className={layoutClasses.sidebarContainer} style={sidebarContainerStyles}>
              {headerSection}
              {children}
              {footerSection}
            </div>
          </>
        ) : (
          <>
            {headerSection}
            {children}
            {footerSection}
          </>
        )}
      </div>
    </>
  );
}
