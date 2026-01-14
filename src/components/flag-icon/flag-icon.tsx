'use client';

import React from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { flagIconClasses } from './classes';

// ----------------------------------------------------------------------

export type FlagIconProps = React.ComponentProps<'span'> & {
  code?: string;
  sx?: any;
};

export function FlagIcon({ code, className, sx, style, ...other }: FlagIconProps) {
  if (!code) {
    return null;
  }

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const rootStyles: React.CSSProperties = {
    width: 26,
    height: 20,
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: '5px',
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    backgroundColor: tokens.colors.background.neutral,
    ...sxStyles,
    ...(style || {}),
  };

  const imgStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    maxWidth: 'unset',
    objectFit: 'cover',
  };

  return (
    <span className={mergeClasses([flagIconClasses.root, className])} style={rootStyles} {...other}>
      <img
        loading="lazy"
        alt={code}
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code?.toUpperCase()}.svg`}
        className={flagIconClasses.img}
        style={imgStyles}
      />
    </span>
  );
}
