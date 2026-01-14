'use client';

import React from 'react';

import { varAlpha } from 'minimal-shared/utils';

import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { tokens } from 'src/theme/design-tokens';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export type EmptyContentProps = React.ComponentProps<'div'> & {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  sx?: any;
  description?: string;
  action?: React.ReactNode;
  slotProps?: {
    img?: React.ComponentProps<'img'> & { sx?: any };
    title?: React.ComponentProps<typeof Typography>;
    description?: React.ComponentProps<typeof Typography>;
  };
};

export function EmptyContent({
  sx,
  imgUrl,
  action,
  filled,
  slotProps,
  description,
  title = 'No data',
  className,
  style,
  ...other
}: EmptyContentProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const rootStyles: React.CSSProperties = {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 24px',
    ...(filled && {
      borderRadius: tokens.shape.borderRadius * 2,
      backgroundColor: varAlpha(tokens.colors.grey['500Channel'], 0.04),
      border: `dashed 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.08)}`,
    }),
    ...sxStyles,
    ...(style || {}),
  };

  const imgMergedSx = Array.isArray(slotProps?.img?.sx) ? slotProps.img.sx : [slotProps?.img?.sx];
  const imgSxStyles = imgMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const imgStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: 160,
    ...imgSxStyles,
  };

  const titleMergedSx = Array.isArray(slotProps?.title?.sx) ? slotProps.title.sx : [slotProps?.title?.sx];
  const titleSxStyles = titleMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const titleStyles: React.CSSProperties = {
    marginTop: '8px',
    textAlign: 'center',
    color: tokens.colors.text.disabled,
    ...titleSxStyles,
  };

  const descMergedSx = Array.isArray(slotProps?.description?.sx)
    ? slotProps.description.sx
    : [slotProps?.description?.sx];
  const descSxStyles = descMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const descStyles: React.CSSProperties = {
    marginTop: '8px',
    textAlign: 'center',
    color: tokens.colors.text.disabled,
    ...descSxStyles,
  };

  return (
    <div className={className} style={rootStyles} {...other}>
      <img
        alt="Empty content"
        src={imgUrl ?? `${CONFIG.assetsDir}/assets/icons/empty/ic-content.svg`}
        style={imgStyles}
        {...slotProps?.img}
      />

      {title && (
        <Typography
          variant="h6"
          style={titleStyles}
          {...slotProps?.title}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          variant="body2"
          style={descStyles}
          {...slotProps?.description}
        >
          {description}
        </Typography>
      )}

      {action && action}
    </div>
  );
}

