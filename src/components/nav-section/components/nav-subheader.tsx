import React, { useState } from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { navSectionClasses } from '../styles';
import { Iconify, iconifyClasses } from '../../iconify';

// ----------------------------------------------------------------------

export type NavSubheaderProps = React.ComponentProps<'div'> & {
  open?: boolean;
};

export const NavSubheader = React.forwardRef<HTMLDivElement, NavSubheaderProps>(
  ({ open, children, className, style, ...other }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const subheaderStyles: React.CSSProperties = {
      ...tokens.typography.overline,
      cursor: 'pointer',
      alignItems: 'center',
      position: 'relative',
      gap: tokens.spacing(1),
      display: 'inline-flex',
      alignSelf: 'flex-start',
      color: 'var(--nav-subheader-color)',
      padding: `${tokens.spacing(2)} ${tokens.spacing(1)} ${tokens.spacing(1)} ${tokens.spacing(1.5)}`,
      fontSize: tokens.typography.pxToRem(11),
      transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      ...(isHovered && {
        paddingLeft: tokens.spacing(2),
        color: 'var(--nav-subheader-hover-color)',
      }),
      ...(style || {}),
    };

    const iconStyles: React.CSSProperties = {
      left: -4,
      opacity: isHovered ? 1 : 0,
      position: 'absolute',
      transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
      <div
        ref={ref}
        component="div"
        className={mergeClasses([navSectionClasses.subheader, className])}
        style={subheaderStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...other}
      >
        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          style={iconStyles}
          className={iconifyClasses.root}
        />
        {children}
      </div>
    );
  }
);

NavSubheader.displayName = 'NavSubheader';
