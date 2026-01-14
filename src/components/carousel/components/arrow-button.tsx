'use client';

import React from 'react';
import styled from '@emotion/styled';
import type { CarouselOptions, CarouselArrowButtonProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { ButtonBaseWrapper as ButtonBase } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

const prevSvgPath = (
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081"
    clipRule="evenodd"
  />
);

const nextSvgPath = (
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12L8.431 5.488a.75.75 0 0 1 .08-1.057"
    clipRule="evenodd"
  />
);

export function ArrowButton({
  sx,
  svgIcon,
  options,
  variant,
  className,
  svgSize = 20,
  style,
  disabled,
  ...other
}: CarouselArrowButtonProps) {
  const isPrev = variant === 'prev';

  const svgContent = svgIcon || (isPrev ? prevSvgPath : nextSvgPath);

  const mergedSx = sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {};

  const buttonStyles: React.CSSProperties = {
    borderRadius: '50%',
    boxSizing: 'content-box',
    padding: tokens.spacing(1),
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled ? 0.4 : 1,
    ...mergedSx,
    ...(style || {}),
  };

  const svgTransform = [];
  if (options?.axis === 'y') {
    svgTransform.push('rotate(90deg)');
  }
  if (options?.direction === 'rtl') {
    svgTransform.push('scaleX(-1)');
  }

  const svgStyles: React.CSSProperties = {
    width: svgSize,
    height: svgSize,
    ...(svgTransform.length > 0 && { transform: svgTransform.join(' ') }),
  };

  return (
    <ButtonBase
      aria-label={isPrev ? 'Prev button' : 'Next button'}
      className={mergeClasses([carouselClasses.arrows[isPrev ? 'prev' : 'next'], className])}
      style={buttonStyles}
      disabled={disabled}
      {...other}
    >
      <svg
        className={carouselClasses.arrows.svg}
        style={svgStyles}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {svgContent}
      </svg>
    </ButtonBase>
  );
}

