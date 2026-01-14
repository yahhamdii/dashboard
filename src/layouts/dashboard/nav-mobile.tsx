import type { NavSectionProps } from 'src/components/nav-section';

import { useEffect } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import { DrawerWrapper as Drawer } from 'src/components/circuit-ui';

import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { useCircuitComponent } from 'src/lib/feature-flags';

import { layoutClasses } from '../core';

// ----------------------------------------------------------------------

type NavMobileProps = NavSectionProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  className,
  checkPermissions,
  ...other
}: NavMobileProps) {
  const pathname = usePathname();
  const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (useCircuit) {
    // Utiliser un drawer natif avec overlay
    return (
      <>
        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-[var(--layout-nav-zIndex)] md:hidden"
            onClick={onClose}
            style={{ zIndex: 'calc(var(--layout-nav-zIndex) - 1)' }}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full z-[var(--layout-nav-zIndex)] transform transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : '-translate-x-full'
            } ${mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className])}`}
          style={{
            overflow: 'unset',
            backgroundColor: 'var(--layout-nav-bg)',
            width: 'var(--layout-nav-mobile-width)',
            ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
          }}
        >
          {slots?.topArea ?? (
            <div className="pl-14 pt-10 pb-4">
              <Logo />
            </div>
          )}

          <Scrollbar fillContent>
            <NavSectionVertical
              data={data}
              checkPermissions={checkPermissions}
              sx={{ px: 2, flex: '1 1 auto' }}
              {...other}
            />
          </Scrollbar>

          {slots?.bottomArea}
        </div>
      </>
    );
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className]),
          sx: [
            {
              overflow: 'unset',
              bgcolor: 'var(--layout-nav-bg)',
              width: 'var(--layout-nav-mobile-width)',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
          <Logo />
        </Box>
      )}

      <Scrollbar fillContent>
        <NavSectionVertical
          data={data}
          checkPermissions={checkPermissions}
          sx={{ px: 2, flex: '1 1 auto' }}
          {...other}
        />
      </Scrollbar>

      {slots?.bottomArea}
    </Drawer>
  );
}
