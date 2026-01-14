import React from 'react';

import { PopoverWrapper } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';
import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const cyanShape =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==';

const redShape =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';

export type NavDropdownPaperProps = React.ComponentProps<'div'>;

export const NavDropdownPaper = React.forwardRef<HTMLDivElement, NavDropdownPaperProps>(
  ({ style, className, ...other }, ref) => {
    const paperStyles: React.CSSProperties = {
      minWidth: 180,
      backgroundImage: `url(${cyanShape}), url(${redShape})`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'top right, left bottom',
      backgroundSize: '50%, 50%',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: varAlpha(tokens.colors.background.paperChannel, 0.9),
      padding: tokens.spacing(0.5),
      boxShadow: tokens.customShadows.dropdown,
      borderRadius: tokens.shape.borderRadius * 1.25,
      ...(style || {}),
    };

    return <div ref={ref} className={className} style={paperStyles} {...other} />;
  }
);

NavDropdownPaper.displayName = 'NavDropdownPaper';

// ----------------------------------------------------------------------

export type NavDropdownProps = React.ComponentProps<typeof PopoverWrapper> & {
  open?: boolean;
  sx?: any;
};

export const NavDropdown = React.forwardRef<HTMLDivElement, NavDropdownProps>(
  ({ open, children, className, style, sx, ...other }, ref) => {
    const popoverStyles: React.CSSProperties = {
      pointerEvents: open ? 'auto' : 'none',
      boxShadow: 'none',
      overflow: 'unset',
      backdropFilter: 'none',
      background: 'transparent',
      padding: `${tokens.spacing(0)} ${tokens.spacing(0.75)}`,
      ...(style || {}),
    };

    return (
      <PopoverWrapper
        ref={ref}
        open={!!open}
        className={className}
        sx={[popoverStyles, ...(Array.isArray(sx) ? sx : [sx])]}
        {...other}
      >
        {children}
      </PopoverWrapper>
    );
  }
);

NavDropdown.displayName = 'NavDropdown';
