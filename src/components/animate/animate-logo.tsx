'use client';

import type { LogoProps } from '../logo';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

import { Logo } from '../logo';

// ----------------------------------------------------------------------

export type AnimateLogoProps = React.ComponentProps<'div'> & {
  sx?: any;
  logo?: React.ReactNode;
  slotProps?: {
    logo?: LogoProps;
  };
};

export function AnimateLogoZoom({ logo, slotProps, sx, ...other }: AnimateLogoProps) {
  return (
    <LogoZoomRoot sx={sx} {...other}>
      <m.span
        animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{
          duration: 2,
          repeatDelay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {logo ?? (
          <Logo
            disabled
            {...slotProps?.logo}
            sx={[
              { width: 64, height: 64 },
              ...(Array.isArray(slotProps?.logo?.sx) ? slotProps.logo.sx : [slotProps?.logo?.sx]),
            ]}
          />
        )}
      </m.span>

      <LogoZoomPrimaryOutline
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />

      <LogoZoomSecondaryOutline
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
      />
    </LogoZoomRoot>
  );
}

const LogoZoomRoot = styled('div')(() => ({
  width: 120,
  height: 120,
  alignItems: 'center',
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
}));

const LogoZoomPrimaryOutline = styled(m.span)(() => ({
  position: 'absolute',
  width: 'calc(100% - 20px)',
  height: 'calc(100% - 20px)',
  border: `solid 3px ${varAlpha(tokens.colors.primary.darkChannel, 0.24)}`,
}));

const LogoZoomSecondaryOutline = styled(m.span)(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  border: `solid 8px ${varAlpha(tokens.colors.primary.darkChannel, 0.24)}`,
}));
