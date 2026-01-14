import type { IconButtonProps } from '@mui/material/IconButton';

import { varAlpha } from 'minimal-shared/utils';

import IconButton from '@mui/material/IconButton';
import { tokens } from 'src/theme/design-tokens';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type NavToggleButtonProps = IconButtonProps & {
  isNavMini: boolean;
};

export function NavToggleButton({ isNavMini, sx, ...other }: NavToggleButtonProps) {
  return (
    <IconButton
      size="small"
      sx={[
        {
          p: 0.5,
          position: 'absolute',
          color: tokens.colors.action.active,
          bgcolor: tokens.colors.background.default,
          transform: 'translate(-50%, -50%)',
          zIndex: 'var(--layout-nav-zIndex)',
          top: 'calc(var(--layout-header-desktop-height) / 2)',
          left: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
          border: `1px solid ${varAlpha(tokens.colors.grey['500Channel'], 0.12)}`,
          transition: 'left var(--layout-transition-duration) var(--layout-transition-easing)',
          '&:hover': {
            color: tokens.colors.text.primary,
            bgcolor: tokens.colors.background.neutral,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify
        width={16}
        icon={isNavMini ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
        sx={() => ({
          ...(tokens.direction === 'rtl' && { transform: 'scaleX(-1)' }),
        })}
      />
    </IconButton>
  );
}
