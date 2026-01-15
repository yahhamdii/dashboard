import type { SettingsState } from 'src/components/settings';

import { tokens } from 'src/theme/design-tokens';
import { varAlpha } from 'minimal-shared/utils';

import { bulletColor } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export function dashboardLayoutVars() {
  return {
    '--layout-transition-easing': 'linear',
    '--layout-transition-duration': '120ms',
    '--layout-nav-mini-width': '88px',
    '--layout-nav-vertical-width': '300px',
    '--layout-nav-horizontal-height': '64px',
    '--layout-dashboard-content-pt': tokens.spacing(1),
    '--layout-dashboard-content-pb': tokens.spacing(8),
    '--layout-dashboard-content-px': tokens.spacing(5),
  };
}

// ----------------------------------------------------------------------

export function dashboardNavColorVars(
  navColor: SettingsState['navColor'] = 'integrate',
  navLayout: SettingsState['navLayout'] = 'vertical'
): Record<'layout' | 'section', Record<string, string | number> | undefined> {
  const { colors: palette } = tokens;

  switch (navColor) {
    case 'integrate':
      return {
        layout: {
          '--layout-nav-bg': palette.background.default,
          '--layout-nav-horizontal-bg': varAlpha(palette.background.default, 0.8), // Using paper as fallback for channel if needed
          '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.12),
          '--layout-nav-text-primary-color': palette.text.primary,
          '--layout-nav-text-secondary-color': palette.text.secondary,
          '--layout-nav-text-disabled-color': palette.text.disabled,
          // Dark mode overrides skipped as requested (ignoring dark mode)
        },
        section: undefined,
      };
    case 'apparent':
      return {
        layout: {
          '--layout-nav-bg': palette.grey[900],
          '--layout-nav-horizontal-bg': varAlpha(palette.grey[900], 0.96),
          '--layout-nav-border-color': 'transparent',
          '--layout-nav-text-primary-color': palette.common.white,
          '--layout-nav-text-secondary-color': palette.grey[500],
          '--layout-nav-text-disabled-color': palette.grey[600],
        },
        section: {
          // caption
          '--nav-item-caption-color': palette.grey[600],
          // subheader
          '--nav-subheader-color': palette.grey[600],
          '--nav-subheader-hover-color': palette.common.white,
          // item
          '--nav-item-color': palette.grey[500],
          '--nav-item-root-active-color': palette.primary.light,
          '--nav-item-root-open-color': palette.common.white,
          // bullet
          '--nav-bullet-light-color': bulletColor.dark,
          // sub
          ...(navLayout === 'vertical' && {
            '--nav-item-sub-active-color': palette.common.white,
            '--nav-item-sub-open-color': palette.common.white,
          }),
        },
      };
    default:
      throw new Error(`Invalid color: ${navColor}`);
  }
}
