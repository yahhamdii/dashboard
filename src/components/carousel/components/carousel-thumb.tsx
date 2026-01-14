'use client';

import React from 'react';
import type { CarouselThumbProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { ButtonBaseWrapper as ButtonBase } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

export function CarouselThumb({
  sx,
  src,
  index,
  selected,
  className,
  style,
  ...other
}: CarouselThumbProps) {
  const mergedSx = sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {};

  const thumbStyles: React.CSSProperties = {
    width: 64,
    height: 64,
    opacity: selected ? 1 : 0.48,
    flexShrink: 0,
    cursor: 'pointer',
    borderRadius: tokens.shape.borderRadius * 1.25,
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: selected ? `0 0 0 2px ${tokens.colors.primary.main}` : 'none',
    ...mergedSx,
    ...(style || {}),
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  };

  return (
    <ButtonBase
      className={mergeClasses([carouselClasses.thumbs.item, className])}
      style={thumbStyles}
      {...other}
    >
      <img
        alt={`carousel-thumb-${index}`}
        src={src}
        className={carouselClasses.thumbs.image}
        style={imageStyles}
      />
    </ButtonBase>
  );
}

