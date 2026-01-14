import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import Divider from '@mui/material/Divider';
import { tokens } from 'src/theme/design-tokens';

import { NavSectionHorizontal } from 'src/components/nav-section';

import { useCircuitComponent } from 'src/lib/feature-flags';

import { layoutClasses } from '../core';

// ----------------------------------------------------------------------

export type NavHorizontalProps = NavSectionProps & {
  layoutQuery?: Breakpoint;
};

export function NavHorizontal({
  sx,
  data,
  className,
  checkPermissions,
  layoutQuery = 'md',
  ...other
}: NavHorizontalProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

  const borderColor = `var(--layout-nav-border-color, ${varAlpha(tokens.colors.grey['500Channel'], 0.08)})`;

  // Filtrer les props HTML standard pour le div
  const {
    render,
    enabledRootRedirect,
    slotProps,
    cssVars,
    ...divProps
  } = other as any;

  // Convertir les breakpoints MUI vers Tailwind
  const breakpointClass = layoutQuery === 'xs' ? 'flex' :
    layoutQuery === 'sm' ? 'hidden sm:flex' :
      layoutQuery === 'md' ? 'hidden md:flex' :
        layoutQuery === 'lg' ? 'hidden lg:flex' :
          layoutQuery === 'xl' ? 'hidden xl:flex' : 'hidden md:flex';

  if (useCircuit) {
    return (
      <div
        className={`${breakpointClass} flex-col relative ${mergeClasses([layoutClasses.nav.root, layoutClasses.nav.horizontal, className])}`}
        style={{
          width: '100%',
          borderBottom: `solid 1px ${borderColor}`,
          ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
        }}
        {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
      >
        {/* Divider */}
        <div
          className="absolute top-0 left-0 w-full z-[9] border-t border-dashed"
          style={{
            borderColor: borderColor,
          }}
        />

        {/* Content */}
        <div
          className="px-6"
          style={{
            height: 'var(--layout-nav-horizontal-height)',
            backgroundColor: 'var(--layout-nav-horizontal-bg)',
            backdropFilter: 'blur(var(--layout-header-blur))',
            WebkitBackdropFilter: 'blur(var(--layout-header-blur))',
          }}
        >
          <NavSectionHorizontal data={data} checkPermissions={checkPermissions} {...other} />
        </div>
      </div>
    );
  }

  return (
    <Box
      className={mergeClasses([layoutClasses.nav.root, layoutClasses.nav.horizontal, className])}
      sx={[
        {
          width: 1,
          position: 'relative',
          flexDirection: 'column',
          display: 'none',
          [`@media (min-width:${tokens.breakpoints.values[layoutQuery]}px)`]: { display: 'flex' },
          borderBottom: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.08)}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Divider
        sx={{
          top: 0,
          left: 0,
          width: 1,
          zIndex: 9,
          position: 'absolute',
          borderStyle: 'dashed',
        }}
      />

      <Box
        sx={{
          px: 1.5,
          height: 'var(--layout-nav-horizontal-height)',
          backgroundColor: 'var(--layout-nav-horizontal-bg)',
          backdropFilter: `blur(var(--layout-header-blur))`,
          WebkitBackdropFilter: `blur(var(--layout-header-blur))`,
        }}
      >
        <NavSectionHorizontal data={data} checkPermissions={checkPermissions} {...other} />
      </Box>
    </Box>
  );
}
