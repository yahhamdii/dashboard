'use client';

import type { Breakpoint } from '@mui/material/styles';
import type { NavItemProps, NavSectionProps } from 'src/components/nav-section';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import { BoxWrapper as Box, AlertWrapper as Alert } from 'src/components/circuit-ui';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useCircuitComponent } from 'src/lib/feature-flags';
import { tokens } from 'src/theme/design-tokens';

import { NavMobile } from './nav-mobile';
import { VerticalDivider } from './content';
import { NavVertical } from './nav-vertical';
import { NavHorizontal } from './nav-horizontal';
import { _workspaces } from '../nav-config-workspace';
import { MenuButton } from '../components/menu-button';
import { WorkspacesPopover } from '../components/workspaces-popover';
import { navData as dashboardNavData } from '../nav-config-dashboard';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { MainSection, layoutClasses, HeaderSection, LayoutSection } from '../core';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps['data'];
    };
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars('integrate', 'vertical');

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const navData = slotProps?.nav?.data ?? dashboardNavData;

  const isNavMini = false;
  const isNavHorizontal = false;
  const isNavVertical = true;

  const canDisplayItemByRole = (allowedRoles: NavItemProps['allowedRoles']): boolean =>
    !allowedRoles?.includes(user?.role);

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
        sx: {
          px: { [layoutQuery]: 5 },
        },
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: useCircuit ? (
        <div className="hidden">
          This is an info Alert.
        </div>
      ) : (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      bottomArea: isNavHorizontal ? (
        <NavHorizontal
          data={navData}
          layoutQuery={layoutQuery}
          cssVars={navVars.section}
          checkPermissions={canDisplayItemByRole}
        />
      ) : null,
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [`@media (min-width:${tokens.breakpoints.values[layoutQuery]}px)`]: { display: 'none' } }}
          />
          <NavMobile
            data={navData}
            open={open}
            onClose={onClose}
            cssVars={navVars.section}
            checkPermissions={canDisplayItemByRole}
          />

          {/** @slot Logo */}
          {isNavHorizontal && (
            <Logo
              sx={{
                display: 'none',
                [`@media (min-width:${tokens.breakpoints.values[layoutQuery]}px)`]: { display: 'inline-flex' },
              }}
            />
          )}

          {/** @slot Divider */}
          {isNavHorizontal && (
            <VerticalDivider sx={{ [`@media (min-width:${tokens.breakpoints.values[layoutQuery]}px)`]: { display: 'flex' } }} />
          )}

          {/** @slot Workspace popover */}
          <WorkspacesPopover data={_workspaces} />
        </>
      ),
      rightArea: useCircuit ? (
        <div className="flex items-center gap-0 sm:gap-3">
          {/** Header components removed */}
        </div>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** Header components removed */}
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={isNavVertical}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderSidebar = () => (
    <NavVertical
      data={navData}
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      cssVars={navVars.section}
      checkPermissions={canDisplayItemByRole}
      onToggleNav={() =>
        settings.setField(
          'navLayout',
          settings.state.navLayout === 'vertical' ? 'mini' : 'vertical'
        )
      }
    />
  );

  const renderFooter = () => null;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={isNavHorizontal ? null : renderSidebar()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(), ...navVars.layout, ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [`@media (min-width:${tokens.breakpoints.values[layoutQuery]}px)`]: {
              pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
              transition: `padding-left var(--layout-transition-duration) var(--layout-transition-easing)`,
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
