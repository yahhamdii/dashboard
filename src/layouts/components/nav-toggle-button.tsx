import React from 'react';

import { varAlpha } from 'minimal-shared/utils';

import { IconButtonWrapper as IconButton } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type NavToggleButtonProps = React.ComponentProps<typeof IconButton> & {
  isNavMini: boolean;
};

export function NavToggleButton({ isNavMini, sx, style, ...other }: NavToggleButtonProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const buttonStyles: React.CSSProperties = {
    padding: '4px',
    position: 'absolute',
    color: tokens.colors.action.active,
    backgroundColor: tokens.colors.background.default,
    transform: 'translate(-50%, -50%)',
    zIndex: 'var(--layout-nav-zIndex)' as any,
    top: 'calc(var(--layout-header-desktop-height) / 2)',
    left: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
    border: `1px solid ${varAlpha(tokens.colors.grey['500Channel'], 0.12)}`,
    transition: 'left var(--layout-transition-duration) var(--layout-transition-easing)',
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <IconButton
      size="small"
      style={buttonStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = tokens.colors.text.primary;
        e.currentTarget.style.backgroundColor = tokens.colors.background.neutral;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = tokens.colors.action.active;
        e.currentTarget.style.backgroundColor = tokens.colors.background.default;
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={isNavMini ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
        style={{
          ...(tokens.direction === 'rtl' && { transform: 'scaleX(-1)' }),
        }}
      />
    </IconButton>
  );
}
