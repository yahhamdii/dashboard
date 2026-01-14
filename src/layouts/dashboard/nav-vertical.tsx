import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { useCircuitComponent } from 'src/lib/feature-flags';

import { layoutClasses } from '../core';

// ----------------------------------------------------------------------

export type NavVerticalProps = React.ComponentProps<'div'> &
  NavSectionProps & {
    isNavMini: boolean;
    layoutQuery?: Breakpoint;
    onToggleNav: () => void;
    slots?: {
      topArea?: React.ReactNode;
      bottomArea?: React.ReactNode;
    };
  };

export function NavVertical({
  sx,
  data,
  slots,
  cssVars,
  className,
  isNavMini,
  onToggleNav, // Keep it in props for now to avoid breaking parents, but don't use it
  checkPermissions,
  layoutQuery = 'md',
  ...other
}: NavVerticalProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

  const renderNavVertical = () => (
    <>
      {slots?.topArea ?? (
        useCircuit ? (
          <div className="pl-14 pt-10 pb-4">
            <Logo />
          </div>
        ) : (
          <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
            <Logo />
          </Box>
        )
      )}

      <Scrollbar fillContent>
        <NavSectionVertical
          data={data}
          cssVars={cssVars}
          checkPermissions={checkPermissions}
          sx={{ px: 2, flex: '1 1 auto' }}
        />

        {slots?.bottomArea}
      </Scrollbar>
    </>
  );

  const navWidth = isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)';
  const borderColor = `var(--layout-nav-border-color, ${varAlpha(tokens.colors.grey['500Channel'], 0.12)})`;

  if (useCircuit) {
    // Convertir les breakpoints MUI vers Tailwind
    const breakpointClass = layoutQuery === 'xs' ? 'hidden' :
      layoutQuery === 'sm' ? 'hidden sm:flex' :
        layoutQuery === 'md' ? 'hidden md:flex' :
          layoutQuery === 'lg' ? 'hidden lg:flex' :
            layoutQuery === 'xl' ? 'hidden xl:flex' : 'hidden md:flex';

    return (
      <div
        className={`${breakpointClass} ${mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className])}`}
        style={{
          top: 0,
          left: 0,
          height: '100%',
          position: 'fixed',
          flexDirection: 'column',
          zIndex: 'var(--layout-nav-zIndex)',
          backgroundColor: 'var(--layout-nav-bg)',
          width: navWidth,
          borderRight: `1px solid ${borderColor}`,
          transition: 'width var(--layout-transition-duration) var(--layout-transition-easing)',
          ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
        }}
        {...other}
      >
        {renderNavVertical()}
      </div>
    );
  }

  return (
    <div
      className={`${mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className])}`}
      style={{
        top: 0,
        left: 0,
        height: '100%',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        backgroundColor: 'var(--layout-nav-bg)',
        width: navWidth,
        borderRight: `1px solid ${borderColor}`,
        transition: 'width var(--layout-transition-duration) var(--layout-transition-easing)',
        display: 'none',
        ...(tokens.breakpoints.values[layoutQuery] !== undefined && {
          [`@media (min-width:${tokens.breakpoints.values[layoutQuery]}px)`]: { display: 'flex' }
        } as any),
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
      }}
      {...other}
    >
      {renderNavVertical()}
    </div>
  );
}
