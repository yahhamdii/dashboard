'use client';

import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import { mergeClasses } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { layoutClasses } from '../core';

// ----------------------------------------------------------------------

export type SimpleCompactContentProps = BoxProps & { layoutQuery?: Breakpoint };

export function SimpleCompactContent({
  sx,
  children,
  className,
  layoutQuery = 'md',
  ...other
}: SimpleCompactContentProps) {
  const breakpointValue = tokens.breakpoints.values[layoutQuery] || tokens.breakpoints.values.md;

  return (
    <Box
      className={mergeClasses([layoutClasses.content, className])}
      sx={[
        {
          width: 1,
          mx: 'auto',
          display: 'flex',
          flex: '1 1 auto',
          textAlign: 'center',
          flexDirection: 'column',
          p: tokens.spacing(3) + ' ' + tokens.spacing(2) + ' ' + tokens.spacing(10) + ' ' + tokens.spacing(2),
          maxWidth: 'var(--layout-simple-content-compact-width)',
          [`@media (min-width: ${breakpointValue}px)`]: {
            justifyContent: 'center',
            p: tokens.spacing(10) + ' 0',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {children}
    </Box>
  );
}
