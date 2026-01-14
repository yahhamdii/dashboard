import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
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

  if (useCircuit) {
    // Convertir les breakpoints MUI vers Tailwind
    const breakpointClass = layoutQuery === 'xs' ? 'hidden' :
                           layoutQuery === 'sm' ? 'hidden sm:flex' :
                           layoutQuery === 'md' ? 'hidden md:flex' :
                           layoutQuery === 'lg' ? 'hidden lg:flex' :
                           layoutQuery === 'xl' ? 'hidden xl:flex' : 'hidden md:flex';
    
    const navWidth = isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)';
    const borderColor = `var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`;
    
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
    <NavRoot
      isNavMini={false}
      layoutQuery={layoutQuery}
      className={mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className])}
      sx={sx}
      {...other}
    >
      {renderNavVertical()}
    </NavRoot>
  );
}

// ----------------------------------------------------------------------

const NavRoot = styled('div', {
  shouldForwardProp: (prop: string) => !['isNavMini', 'layoutQuery', 'sx'].includes(prop),
})<Pick<NavVerticalProps, 'isNavMini' | 'layoutQuery'>>(
  ({ isNavMini, layoutQuery = 'md', theme }) => ({
    top: 0,
    left: 0,
    height: '100%',
    display: 'none',
    position: 'fixed',
    flexDirection: 'column',
    zIndex: 'var(--layout-nav-zIndex)',
    backgroundColor: 'var(--layout-nav-bg)',
    width: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
    borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
    transition: theme.transitions.create(['width'], {
      easing: 'var(--layout-transition-easing)',
      duration: 'var(--layout-transition-duration)',
    }),
    [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
  })
);
