'use client';

import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { LinearProgressWrapper as LinearProgress } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

export type LoadingScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean;
  sx?: any;
  style?: React.CSSProperties;
  slots?: {
    progress?: React.ReactNode;
  };
  slotsProps?: {
    progress?: React.ComponentProps<typeof LinearProgress> & { sx?: any };
  };
};

export function LoadingScreen({ portal, slots, slotsProps, sx, style, ...other }: LoadingScreenProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const contentStyles: React.CSSProperties = {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: tokens.spacing(5),
    paddingRight: tokens.spacing(5),
    ...sxStyles,
    ...(style || {}),
  };

  const progressMergedSx = Array.isArray(slotsProps?.progress?.sx)
    ? slotsProps.progress.sx
    : [slotsProps?.progress?.sx];
  const progressSxStyles = progressMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const progressStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: 360,
    ...progressSxStyles,
  };

  const content = (
    <div style={contentStyles} {...other}>
      {slots?.progress ?? (
        <LinearProgress
          color="inherit"
          style={progressStyles}
          {...slotsProps?.progress}
        />
      )}
    </div>
  );

  if (portal) {
    return createPortal(content, document.body);
  }

  return <>{content}</>;
}
