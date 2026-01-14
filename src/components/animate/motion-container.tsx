'use client';

import type { MotionProps } from 'framer-motion';

import { m } from 'framer-motion';
import styled from '@emotion/styled';

import { varContainer } from './variants';

// ----------------------------------------------------------------------

export type MotionContainerProps = React.ComponentProps<'div'> &
  MotionProps & {
    animate?: boolean;
    action?: boolean;
    sx?: React.CSSProperties; // Simplified sx support
  };

const MotionDiv = styled(m.div)(() => ({}));

export function MotionContainer({
  sx,
  animate,
  children,
  action = false,
  ...other
}: MotionContainerProps) {
  // Extract framer-motion props
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
      style={sx}
    >
      {children}
    </MotionDiv>
  );
}
