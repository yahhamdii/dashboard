'use client';

import React from 'react';
import type { CarouselProgressBarProps } from '../types';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

export function CarouselProgressBar({ sx, value, className, style, ...other }: CarouselProgressBarProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const rootStyles: React.CSSProperties = {
    height: 6,
    maxWidth: 120,
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    color: tokens.colors.text.primary,
    backgroundColor: varAlpha(tokens.colors.grey['500Channel'], 0.2),
    '--progress-value': value,
    ...sxStyles,
    ...(style || {}),
  };

  const barStyles: React.CSSProperties = {
    top: 0,
    bottom: 0,
    width: '100%',
    left: '-100%',
    position: 'absolute',
    backgroundColor: 'currentColor',
    transform: `translate3d(calc(var(--progress-value) * ${tokens.direction === 'rtl' ? -1 : 1}%), 0px, 0px)`,
  };

  return (
    <div
      className={mergeClasses([carouselClasses.progress.root, className])}
      style={rootStyles}
      {...other}
    >
      <span className={carouselClasses.progress.bar} style={barStyles} />
    </div>
  );
}
