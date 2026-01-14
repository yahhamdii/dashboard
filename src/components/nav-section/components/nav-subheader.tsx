import type { ListSubheaderProps } from '@mui/material/ListSubheader';

import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import { tokens } from 'src/theme/design-tokens';

import { navSectionClasses } from '../styles';
import { Iconify, iconifyClasses } from '../../iconify';

// ----------------------------------------------------------------------

export type NavSubheaderProps = ListSubheaderProps & { open?: boolean };

export const NavSubheader = styled(({ open, children, className, ...other }: NavSubheaderProps) => (
  <ListSubheader
    disableSticky
    component="div"
    {...other}
    className={mergeClasses([navSectionClasses.subheader, className])}
  >
    <Iconify
      width={16}
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
    />
    {children}
  </ListSubheader>
))(() => ({
  ...tokens.typography.overline,
  cursor: 'pointer',
  alignItems: 'center',
  position: 'relative',
  gap: tokens.spacing(1),
  display: 'inline-flex',
  alignSelf: 'flex-start',
  color: 'var(--nav-subheader-color)',
  padding: tokens.spacing(2) + ' ' + tokens.spacing(1) + ' ' + tokens.spacing(1) + ' ' + tokens.spacing(1.5),
  fontSize: tokens.typography.pxToRem(11),
  transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  [`& .${iconifyClasses.root}`]: {
    left: -4,
    opacity: 0,
    position: 'absolute',
    transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    paddingLeft: tokens.spacing(2),
    color: 'var(--nav-subheader-hover-color)',
    [`& .${iconifyClasses.root}`]: { opacity: 1 },
  },
}));
