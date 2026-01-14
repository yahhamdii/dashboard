import React from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { navSectionClasses } from '../styles';

import styled from '@emotion/styled';

// ----------------------------------------------------------------------

export const Nav = React.forwardRef<HTMLElement, React.ComponentProps<'nav'>>(
  ({ className, ...other }, ref) => {
    return <nav ref={ref} className={className} {...other} />;
  }
);

Nav.displayName = 'Nav';

// ----------------------------------------------------------------------

export const NavLi = styled('li', {
  shouldForwardProp: (prop: string) => !['sx', 'disabled'].includes(prop),
})<{ disabled?: boolean; sx?: any }>(({ disabled, sx }: any) => [
  {
    display: 'inline-block',
    ...(disabled && { cursor: 'not-allowed' }),
  },
  ...(Array.isArray(sx) ? sx : [sx]),
]);

// ----------------------------------------------------------------------

export const NavUl = styled('ul', {
  shouldForwardProp: (prop: string) => !['sx'].includes(prop),
})<{ sx?: any }>(({ sx }: any) => [
  {
    display: 'flex',
    flexDirection: 'column',
  },
  ...(Array.isArray(sx) ? sx : [sx]),
]);
