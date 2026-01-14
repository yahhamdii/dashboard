'use client';

import type { LabelVariant } from './types';

import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

const paletteKeys = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const commonKeys = ['black', 'white'] as const;
const allColors = ['default', ...paletteKeys, ...commonKeys] as const;

export const LabelRoot = styled('span', {
  shouldForwardProp: (prop: string) => !['color', 'variant', 'disabled', 'sx'].includes(prop),
})<{ variant?: LabelVariant; disabled?: boolean; color?: string }>(() => ({
  height: 24,
  minWidth: 24,
  flexShrink: 0,
  lineHeight: 18 / 12,
  cursor: 'default',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  gap: tokens.spacing(0.75),
  justifyContent: 'center',
  padding: tokens.spacing(0, 0.75),
  fontSize: tokens.typography.pxToRem(12),
  fontWeight: tokens.typography.fontWeightBold,
  borderRadius: tokens.shape.borderRadius * 0.75,
  variants: [
    /**
     * @variant filled
     */
    {
      props: { variant: 'filled', color: 'default' },
      style: {
        color: tokens.colors.grey[800],
        backgroundColor: tokens.colors.grey[300],
      },
    },
    ...paletteKeys.map((colorKey) => ({
      props: { variant: 'filled', color: colorKey },
      style: {
        color: tokens.colors.common.white,
        backgroundColor: (tokens.colors as any)[colorKey].main,
      },
    })),
    ...commonKeys.map((colorKey) => ({
      props: { variant: 'filled', color: colorKey },
      style: {
        color: tokens.colors.common[colorKey === 'white' ? 'black' : 'white'],
        backgroundColor: tokens.colors.common[colorKey],
      },
    })),
    /**
     * @variant outlined
     */
    {
      props: { variant: 'outlined' },
      style: {
        border: '2px solid currentColor',
      },
    },
    ...paletteKeys.map((colorKey) => ({
      props: { variant: 'outlined', color: colorKey },
      style: {
        color: (tokens.colors as any)[colorKey].main,
      },
    })),
    ...commonKeys.map((colorKey) => ({
      props: { variant: 'outlined', color: colorKey },
      style: {
        color: tokens.colors.common[colorKey],
      },
    })),
    /**
     * @variant soft
     */
    {
      props: { variant: 'soft', color: 'default' },
      style: {
        color: tokens.colors.grey[800],
        backgroundColor: tokens.colors.grey[300],
      },
    },
    ...paletteKeys.map((colorKey) => ({
      props: { variant: 'soft', color: colorKey },
      style: {
        color: (tokens.colors as any)[colorKey]?.dark || 'currentColor',
        backgroundColor: varAlpha((tokens.colors as any)[colorKey]?.mainChannel || '0 0 0', tokens.opacity.soft.bg),
      },
    })),
    ...commonKeys.map((colorKey) => ({
      props: { variant: 'soft', color: colorKey },
      style: {
        color: tokens.colors.common[colorKey],
        backgroundColor: varAlpha('currentColor', tokens.opacity.soft.commonBg),
      },
    })),
    /**
     * @variant inverted
     */
    {
      props: { variant: 'inverted', color: 'default' },
      style: {
        color: tokens.colors.grey[800],
        backgroundColor: tokens.colors.grey[300],
      },
    },
    ...paletteKeys.map((colorKey) => ({
      props: { variant: 'inverted', color: colorKey },
      style: {
        color: (tokens.colors as any)[colorKey].lighter,
        backgroundColor: (tokens.colors as any)[colorKey].darker,
      },
    })),
    ...commonKeys.map((colorKey) => ({
      props: { variant: 'inverted', color: colorKey },
      style: {
        color: tokens.colors.common[colorKey],
        backgroundColor: varAlpha('currentColor', tokens.opacity.soft.commonHoverBg),
      },
    })),
    /**
     * @disabled
     */
    {
      props: { disabled: true },
      style: {
        opacity: 0.48,
        pointerEvents: 'none',
      },
    },
  ],
}));

export const LabelIcon = styled('span')({
  width: 16,
  height: 16,
  flexShrink: 0,
  '& svg, & img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});
