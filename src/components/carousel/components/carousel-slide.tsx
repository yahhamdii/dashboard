'use client';

import React from 'react';
import type { CarouselOptions, CarouselSlideProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { getSlideSize } from '../utils';
import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

export function CarouselSlide({ sx, options, children, className, style, ...other }: CarouselSlideProps) {
  const slideSize = getSlideSize(options?.slidesToShow);
  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing;

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const slideStyles: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    flex: slideSize,
    ...(axis === 'x' ? { minWidth: 0, paddingLeft: slideSpacing } : { minHeight: 0, paddingTop: slideSpacing }),
    ...sxStyles,
    ...(style || {}),
  };

  const contentStyles: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 'inherit',
  };

  return (
    <li
      className={mergeClasses([carouselClasses.slide.root, className])}
      style={slideStyles}
      {...other}
    >
      {options?.parallax ? (
        <div className={carouselClasses.slide.content} style={contentStyles}>
          <div className={carouselClasses.slide.parallax}>{children}</div>
        </div>
      ) : (
        children
      )}
    </li>
  );
}
