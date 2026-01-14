'use client';

import React, { Children, isValidElement } from 'react';
import type { CarouselOptions, CarouselThumbsProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { carouselClasses } from '../classes';
import { CarouselSlide } from './carousel-slide';

// ----------------------------------------------------------------------

export function CarouselThumbs({
  sx,
  options,
  children,
  slotProps,
  className,
  style,
  ...other
}: CarouselThumbsProps) {
  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing ?? '12px';
  const enableMask = !slotProps?.disableMask;

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const containerMergedSx = Array.isArray(slotProps?.container) ? slotProps.container : [slotProps?.container];
  const containerSxStyles = containerMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const maskBg = `${tokens.colors.background.paper} 20%, transparent 100%)`;

  const rootStyles: React.CSSProperties = {
    flexShrink: 0,
    margin: 'auto',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    ...(axis === 'x' ? {
      maxWidth: '100%',
      padding: tokens.spacing(0.5),
      ...(enableMask && {
        position: 'relative',
      }),
    } : {
      height: '100%',
      maxHeight: '100%',
      padding: tokens.spacing(0.5),
      ...(enableMask && {
        position: 'relative',
      }),
    }),
    ...sxStyles,
    ...(style || {}),
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    backfaceVisibility: 'hidden',
    ...(axis === 'x' ? {
      touchAction: 'pan-y pinch-zoom',
      marginLeft: `calc(${slideSpacing} * -1)`,
    } : {
      height: '100%',
      flexDirection: 'column',
      touchAction: 'pan-x pinch-zoom',
      marginTop: `calc(${slideSpacing} * -1)`,
    }),
    ...containerSxStyles,
  };

  const renderChildren = () =>
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const reactChild = child as React.ReactElement<{ key?: React.Key }>;

        return (
          <CarouselSlide
            key={reactChild.key}
            options={{ ...options, slideSpacing }}
            sx={slotProps?.slide}
          >
            {child}
          </CarouselSlide>
        );
      }
      return null;
    });

  return (
    <div
      className={mergeClasses([carouselClasses.thumbs.root, className])}
      style={rootStyles}
      {...other}
    >
      {enableMask && axis === 'x' && (
        <>
          <div
            style={{
              top: 0,
              zIndex: 9,
              width: 40,
              height: '100%',
              position: 'absolute',
              left: -8,
              background: `linear-gradient(to right, ${maskBg}`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              top: 0,
              zIndex: 9,
              width: 40,
              height: '100%',
              position: 'absolute',
              right: -8,
              background: `linear-gradient(to left, ${maskBg}`,
              pointerEvents: 'none',
            }}
          />
        </>
      )}
      {enableMask && axis === 'y' && (
        <>
          <div
            style={{
              left: 0,
              zIndex: 9,
              height: 40,
              width: '100%',
              position: 'absolute',
              top: -8,
              background: `linear-gradient(to bottom, ${maskBg}`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              left: 0,
              zIndex: 9,
              height: 40,
              width: '100%',
              position: 'absolute',
              bottom: -8,
              background: `linear-gradient(to top, ${maskBg}`,
              pointerEvents: 'none',
            }}
          />
        </>
      )}
      <ul
        className={carouselClasses.thumbs.container}
        style={containerStyles}
      >
        {renderChildren()}
      </ul>
    </div>
  );
}

