'use client';

import type { LabelVariant } from './types';

import { varAlpha } from 'minimal-shared/utils';

import styled from '@emotion/styled';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

const paletteKeys = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const commonKeys = ['black', 'white'] as const;
const allColors = ['default', ...paletteKeys, ...commonKeys] as const;

export const LabelRoot = styled('span', {
  shouldForwardProp: (prop: string) => !['color', 'variant', 'disabled', 'sx'].includes(prop),
})<{ variant?: LabelVariant; disabled?: boolean; color?: string }>(({ variant = 'soft', disabled, color = 'default' }) => {
  const styles: any = {
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
  };

  // Filled variant
  if (variant === 'filled') {
    if (color === 'default') {
      styles.color = tokens.colors.grey[800];
      styles.backgroundColor = tokens.colors.grey[300];
    } else if (paletteKeys.includes(color as any)) {
      styles.color = tokens.colors.common.white;
      styles.backgroundColor = (tokens.colors as any)[color].main;
    } else if (commonKeys.includes(color as any)) {
      styles.color = (tokens.colors.common as any)[color === 'white' ? 'black' : 'white'];
      styles.backgroundColor = (tokens.colors.common as any)[color as any];
    }
  }

  // Outlined variant
  if (variant === 'outlined') {
    styles.border = '2px solid currentColor';
    if (paletteKeys.includes(color as any)) {
      styles.color = (tokens.colors as any)[color].main;
    } else if (commonKeys.includes(color as any)) {
      styles.color = (tokens.colors.common as any)[color as any];
    }
  }

  // Soft variant
  if (variant === 'soft') {
    if (color === 'default') {
      styles.color = tokens.colors.grey[800];
      styles.backgroundColor = tokens.colors.grey[300];
    } else if (paletteKeys.includes(color as any)) {
      styles.color = (tokens.colors as any)[color]?.dark || 'currentColor';
      styles.backgroundColor = varAlpha((tokens.colors as any)[color]?.mainChannel || '0 0 0', tokens.opacity.soft.bg);
    } else if (commonKeys.includes(color as any)) {
      styles.color = (tokens.colors.common as any)[color as any];
      styles.backgroundColor = varAlpha('currentColor', tokens.opacity.soft.commonBg);
    }
  }

  // Inverted variant
  if (variant === 'inverted') {
    if (color === 'default') {
      styles.color = tokens.colors.grey[800];
      styles.backgroundColor = tokens.colors.grey[300];
    } else if (paletteKeys.includes(color as any)) {
      styles.color = (tokens.colors as any)[color].lighter;
      styles.backgroundColor = (tokens.colors as any)[color].darker;
    } else if (commonKeys.includes(color as any)) {
      styles.color = (tokens.colors.common as any)[color as any];
      styles.backgroundColor = varAlpha('currentColor', tokens.opacity.soft.commonHoverBg);
    }
  }

  // Disabled
  if (disabled) {
    styles.opacity = 0.48;
    styles.pointerEvents = 'none';
  }

  return styles;
});

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
