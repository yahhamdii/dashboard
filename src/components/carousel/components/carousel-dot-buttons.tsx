'use client';

import React from 'react';
import type { CarouselDotButtonsProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { BoxWrapper as Box, ButtonBaseWrapper as ButtonBase } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

const DOT_SIZES = { circular: 8, rounded: 8, number: 28 } as const;
const DOT_GAPS = { rounded: 2, circular: 2, number: 6 } as const;
const OUTER_PADDING = 12;

export function CarouselDotButtons({
  sx,
  gap,
  slotProps,
  className,
  onClickDot,
  scrollSnaps,
  selectedIndex,
  variant = 'circular',
  style,
  ...other
}: CarouselDotButtonsProps) {
  const dotGap = gap ?? DOT_GAPS[variant as keyof typeof DOT_GAPS];
  const dotSize = slotProps?.dot?.size ?? DOT_SIZES[variant as keyof typeof DOT_SIZES];
  const listItemHeight = variant === 'number' ? dotSize : dotSize + OUTER_PADDING;

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const boxStyles: React.CSSProperties = {
    zIndex: 9,
    display: 'flex',
    gap: `${dotGap}px`,
    height: listItemHeight,
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <ul
      className={mergeClasses([carouselClasses.dots.root, className])}
      style={boxStyles}
      {...other}
    >
      {scrollSnaps.map((_: number, index: number) => {
        const isSelected = index === selectedIndex;

        return (
          <li key={index} style={{ display: 'inline-flex' }}>
            <DotItem
              aria-label={`dot-${index}`}
              size={dotSize}
              variant={variant}
              selected={isSelected}
              className={mergeClasses(carouselClasses.dots.item, {
                [carouselClasses.dots.itemSelected]: isSelected,
              })}
              onClick={() => onClickDot(index)}
              sx={slotProps?.dot?.sx}
            >
              {variant === 'number' && index + 1}
            </DotItem>
          </li>
        );
      })}
    </ul>
  );
}

// ----------------------------------------------------------------------

type DotItemProps = Pick<CarouselDotButtonsProps, 'variant'> & {
  selected?: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
  sx?: any;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const DotItem: React.FC<DotItemProps> = ({
  size = 0,
  selected,
  variant,
  className,
  onClick,
  sx,
  style,
  children,
  ...other
}) => {
  const wrapperSize = size + OUTER_PADDING;

  const dotBaseStyles: React.CSSProperties = {
    width: size,
    height: size,
    opacity: selected ? 1 : 0.24,
    backgroundColor: 'currentColor',
    transition:
      'width 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const mergedSx =
    sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {};
  const mergedStyle = { ...mergedSx, ...(style || {}) };

  if (variant === 'circular') {
    const circularStyles: React.CSSProperties = {
      width: wrapperSize,
      height: wrapperSize,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...mergedStyle,
    };

    return (
      <ButtonBase className={className} onClick={onClick} style={circularStyles} {...other}>
        <span
          style={{
            ...dotBaseStyles,
            borderRadius: '50%',
            position: 'absolute',
          }}
        />
      </ButtonBase>
    );
  }

  if (variant === 'rounded') {
    const roundedStyles: React.CSSProperties = {
      width: wrapperSize,
      height: wrapperSize,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...mergedStyle,
    };

    return (
      <ButtonBase className={className} onClick={onClick} style={roundedStyles} {...other}>
        <span
          style={{
            ...dotBaseStyles,
            borderRadius: size / 2,
            width: selected ? 'calc(100% - 4px)' : size,
            position: 'absolute',
          }}
        />
      </ButtonBase>
    );
  }

  // variant === 'number'
  const numberStyles: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    fontSize: tokens.typography.pxToRem(14),
    lineHeight: '22px',
    color: selected ? tokens.colors.common.white : tokens.colors.text.disabled,
    backgroundColor: selected ? tokens.colors.grey[800] : 'transparent',
    fontWeight: selected ? tokens.typography.fontWeightBold : tokens.typography.fontWeightRegular,
    border: selected ? 'transparent' : `solid 1px ${tokens.colors.shared.buttonOutlined}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...mergedStyle,
  };

  return (
    <ButtonBase className={className} onClick={onClick} style={numberStyles} {...other}>
      {children}
    </ButtonBase>
  );
};
