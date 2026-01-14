'use client';

import type { CarouselArrowButtonsProps } from '../types';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

import { ArrowButton } from './arrow-button';
import { carouselClasses } from '../classes';

// ----------------------------------------------------------------------

const BasicButtonsRoot = styled('div')(() => ({
  gap: '4px',
  zIndex: 9,
  alignItems: 'center',
  display: 'inline-flex',
  color: tokens.colors.action.active,
}));

export function CarouselArrowBasicButtons({
  sx,
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  className,
  ...other
}: CarouselArrowButtonsProps) {
  return (
    <BasicButtonsRoot
      className={mergeClasses([carouselClasses.arrows.root, className])}
      sx={sx}
      {...other}
    >
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        sx={slotProps?.prevBtn?.sx}
      />

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        sx={slotProps?.nextBtn?.sx}
      />
    </BasicButtonsRoot>
  );
}

// ----------------------------------------------------------------------

export function CarouselArrowFloatButtons({
  sx,
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
}: CarouselArrowButtonsProps) {
  const baseStyles = {
    zIndex: 9,
    top: '50%',
    borderRadius: tokens.shape.borderRadius * 1.5,
    position: 'absolute' as const,
    color: tokens.colors.common.white,
    bgcolor: tokens.colors.text.primary,
    '&:hover': { opacity: 0.8 },
  };

  return (
    <>
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        sx={[
          {
            ...baseStyles,
            left: 0,
            transform: 'translate(-50%, -50%)',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
          ...(Array.isArray(slotProps?.prevBtn?.sx)
            ? slotProps.prevBtn.sx
            : [slotProps?.prevBtn?.sx]),
        ]}
      />

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        sx={[
          {
            ...baseStyles,
            right: 0,
            transform: 'translate(50%, -50%)',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
          ...(Array.isArray(slotProps?.nextBtn?.sx)
            ? slotProps.nextBtn.sx
            : [slotProps?.nextBtn?.sx]),
        ]}
      />
    </>
  );
}

// ----------------------------------------------------------------------

const NumberButtonsRoot = styled('div')(() => ({
  gap: '2px',
  zIndex: 9,
  alignItems: 'center',
  display: 'inline-flex',
  padding: tokens.spacing(0.5),
  color: tokens.colors.common.white,
  borderRadius: tokens.shape.borderRadius * 1.25,
  backgroundColor: varAlpha(tokens.colors.grey['900Channel'], 0.48),
  [`& .${carouselClasses.arrows.label}`]: {
    ...tokens.typography.subtitle2,
    margin: tokens.spacing(0, 0.5),
  },
  [`& .${carouselClasses.arrows.prev}`]: {
    borderRadius: 'inherit',
    padding: tokens.spacing(0.75),
  },
  [`& .${carouselClasses.arrows.next}`]: {
    borderRadius: 'inherit',
    padding: tokens.spacing(0.75),
  },
}));

export function CarouselArrowNumberButtons({
  sx,
  options,
  slotProps,
  className,
  totalSlides,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  selectedIndex,
  ...other
}: CarouselArrowButtonsProps) {
  return (
    <NumberButtonsRoot
      className={mergeClasses([carouselClasses.arrows.root, className])}
      sx={sx}
      {...other}
    >
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize ?? 16}
        sx={slotProps?.prevBtn?.sx}
      />

      <span className={carouselClasses.arrows.label}>
        {selectedIndex}/{totalSlides}
      </span>

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize ?? 16}
        sx={slotProps?.nextBtn?.sx}
      />
    </NumberButtonsRoot>
  );
}
