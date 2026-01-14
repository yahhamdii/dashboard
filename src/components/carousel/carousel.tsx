'use client';

import type { CarouselProps, CarouselOptions } from './types';

import { Children, isValidElement } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import styled from '@emotion/styled';

import { carouselClasses } from './classes';
import { CarouselSlide } from './components/carousel-slide';

// ----------------------------------------------------------------------

export function Carousel({
  sx,
  carousel,
  children,
  slotProps,
  className,
  ...other
}: CarouselProps) {
  const { mainRef, options } = carousel;

  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing ?? '0px';

  const renderChildren = () =>
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const reactChild = child as React.ReactElement<{ key?: React.Key }>;

        return (
          <CarouselSlide key={reactChild.key} options={carousel.options} sx={slotProps?.slide}>
            {child}
          </CarouselSlide>
        );
      }
      return null;
    });

  return (
    <CarouselRoot
      sx={sx}
      ref={mainRef}
      axis={axis}
      className={mergeClasses([carouselClasses.root, className])}
      {...other}
    >
      <CarouselContainer
        axis={axis}
        slideSpacing={slideSpacing}
        className={carouselClasses.container}
        sx={[
          {
            ...(carousel.pluginNames?.includes('autoHeight') && {
              alignItems: 'flex-start',
              transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            }),
          },
          ...(Array.isArray(slotProps?.container) ? slotProps.container : [slotProps?.container]),
        ]}
      >
        {renderChildren()}
      </CarouselContainer>
    </CarouselRoot>
  );
}

// ----------------------------------------------------------------------

const CarouselRoot = styled('div', {
  shouldForwardProp: (prop: string) => !['axis', 'sx'].includes(prop),
})<Pick<CarouselOptions, 'axis'> & { sx?: any }>(({ axis, sx }) => [
  {
    margin: 'auto',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  axis === 'y' && { height: '100%' },
  ...(Array.isArray(sx) ? sx : [sx]),
]);

const CarouselContainer = styled('ul', {
  shouldForwardProp: (prop: string) => !['axis', 'slideSpacing', 'sx'].includes(prop),
})<Pick<CarouselOptions, 'axis' | 'slideSpacing'> & { sx?: any }>(({ axis, slideSpacing, sx }) => [
  {
    display: 'flex',
    backfaceVisibility: 'hidden',
  },
  axis === 'x' && {
    touchAction: 'pan-y pinch-zoom',
    marginLeft: `calc(${slideSpacing} * -1)`,
  },
  axis === 'y' && {
    height: '100%',
    flexDirection: 'column',
    touchAction: 'pan-x pinch-zoom',
    marginTop: `calc(${slideSpacing} * -1)`,
  },
  ...(Array.isArray(sx) ? sx : [sx]),
]);
