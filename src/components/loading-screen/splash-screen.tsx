'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { tokens } from 'src/theme/design-tokens';

import { AnimateLogoZoom } from '../animate';

// ----------------------------------------------------------------------

export type SplashScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean;
  sx?: any;
  style?: React.CSSProperties;
  slots?: {
    logo?: React.ReactNode;
  };
  slotProps?: {
    wrapper?: React.ComponentProps<'div'>;
    logo?: any;
  };
};

export function SplashScreen({ portal = true, slots, slotProps, sx, style, ...other }: SplashScreenProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const wrapperStyles: React.CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyles: React.CSSProperties = {
    right: 0,
    bottom: 0,
    zIndex: 9998,
    flexGrow: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.background.default,
    ...sxStyles,
    ...(style || {}),
  };

  const content = (
    <div style={wrapperStyles} {...slotProps?.wrapper}>
      <div style={contentStyles} {...other}>
        {slots?.logo ?? <AnimateLogoZoom {...slotProps?.logo} />}
      </div>
    </div>
  );

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (portal && mounted) {
    return createPortal(content, document.body);
  }

  return <>{content}</>;
}
