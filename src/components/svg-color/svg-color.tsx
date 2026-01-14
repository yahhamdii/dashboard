'use client';

import React from 'react';
import type { SvgColorProps } from './types';

import { mergeClasses } from 'minimal-shared/utils';

import { svgColorClasses } from './classes';

// ----------------------------------------------------------------------

export function SvgColor({ src, className, sx, style, ...other }: SvgColorProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const svgStyles: React.CSSProperties = {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'inline-flex',
    backgroundColor: 'currentColor',
    mask: `url(${src}) no-repeat center / contain`,
    WebkitMask: `url(${src}) no-repeat center / contain`,
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <span
      className={mergeClasses([svgColorClasses.root, className])}
      style={svgStyles}
      {...other}
    />
  );
}
