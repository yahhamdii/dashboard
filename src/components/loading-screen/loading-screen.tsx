'use client';

import type { LinearProgressProps } from '@mui/material/LinearProgress';

import { Fragment } from 'react';

import Portal from '@mui/material/Portal';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { tokens } from 'src/theme/design-tokens';

// ----------------------------------------------------------------------

export type LoadingScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean;
  sx?: any;
  slots?: {
    progress?: React.ReactNode;
  };
  slotsProps?: {
    progress?: LinearProgressProps;
  };
};

export function LoadingScreen({ portal, slots, slotsProps, sx, ...other }: LoadingScreenProps) {
  const PortalWrapper = portal ? Portal : Fragment;

  return (
    <PortalWrapper>
      <LoadingContent sx={sx} {...other}>
        {slots?.progress ?? (
          <LinearProgress
            color="inherit"
            sx={[
              { width: 1, maxWidth: 360 },
              ...(Array.isArray(slotsProps?.progress?.sx)
                ? slotsProps.progress.sx
                : [slotsProps?.progress?.sx]),
            ]}
            {...slotsProps?.progress}
          />
        )}
      </LoadingContent>
    </PortalWrapper>
  );
}

// ----------------------------------------------------------------------

const LoadingContent = styled('div')(() => ({
  flexGrow: 1,
  width: '100%',
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: tokens.spacing(5),
  paddingRight: tokens.spacing(5),
}));
