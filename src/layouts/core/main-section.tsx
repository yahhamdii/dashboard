'use client';

import React from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { layoutClasses } from './classes';

// ----------------------------------------------------------------------

export type MainSectionProps = React.ComponentProps<'main'> & {
  sx?: any;
};

export function MainSection({ children, className, sx, style, ...other }: MainSectionProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const mainStyles: React.CSSProperties = {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <main className={mergeClasses([layoutClasses.main, className])} style={mainStyles} {...other}>
      {children}
    </main>
  );
}
