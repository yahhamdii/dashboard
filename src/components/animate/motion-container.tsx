'use client';

import type { MotionProps } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

export type MotionContainerProps = BoxProps &
  MotionProps & {
    animate?: boolean;
    action?: boolean;
  };

const MotionDiv = styled(m.div)(({ theme }) => ({}));

export function MotionContainer({
  sx,
  animate,
  children,
  action = false,
  ...other
}: MotionContainerProps) {
  // Extraire les props MUI (sx, etc.) des props framer-motion
  const { component, ...motionProps } = other as any;
  const motionOnlyProps = {
    variants: varContainer(),
    initial: action ? false : 'initial',
    animate: action ? (animate ? 'animate' : 'exit') : 'animate',
    exit: action ? undefined : 'exit',
  };

  return (
    <MotionDiv
      {...motionOnlyProps}
      {...motionProps}
      style={sx && typeof sx === 'object' && !Array.isArray(sx) ? sx as React.CSSProperties : undefined}
    >
      {children}
    </MotionDiv>
  );
}
