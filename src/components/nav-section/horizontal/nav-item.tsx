import styled from '@emotion/styled';
// import type { CSSObject } from '@mui/material/styles';
import type { NavItemProps } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

import { TooltipWrapper as Tooltip, ButtonBaseWrapper as ButtonBase } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { Iconify } from '../../iconify';
import { createNavItem } from '../utils';
import { navItemStyles, navSectionClasses } from '../styles';

// ----------------------------------------------------------------------

export function NavItem({
  path,
  icon,
  info,
  title,
  caption,
  /********/
  open,
  active,
  disabled,
  /********/
  depth,
  render,
  hasChild,
  slotProps,
  className,
  externalLink,
  enabledRootRedirect,
  ...other
}: NavItemProps) {
  const navItem = createNavItem({
    path,
    icon,
    info,
    depth,
    render,
    hasChild,
    externalLink,
    enabledRootRedirect,
  });

  const ownerState: StyledState = {
    open,
    active,
    disabled,
    variant: navItem.rootItem ? 'rootItem' : 'subItem',
  };

  return (
    <ItemRoot
      aria-label={title}
      {...ownerState}
      {...navItem.baseProps}
      className={mergeClasses([navSectionClasses.item.root, className], {
        [navSectionClasses.state.open]: open,
        [navSectionClasses.state.active]: active,
        [navSectionClasses.state.disabled]: disabled,
      })}
      sx={slotProps?.sx}
      {...other}
    >
      {icon && (
        <ItemIcon {...ownerState} className={navSectionClasses.item.icon} sx={slotProps?.icon}>
          {navItem.renderIcon}
        </ItemIcon>
      )}

      {title && (
        <ItemTitle {...ownerState} className={navSectionClasses.item.title} sx={slotProps?.title}>
          {title}
        </ItemTitle>
      )}

      {caption && (
        <Tooltip title={caption} arrow>
          <ItemCaptionIcon
            {...ownerState}
            icon="eva:info-outline"
            className={navSectionClasses.item.caption}
            sx={slotProps?.caption}
          />
        </Tooltip>
      )}

      {info && (
        <ItemInfo {...ownerState} className={navSectionClasses.item.info} sx={slotProps?.info}>
          {navItem.renderInfo}
        </ItemInfo>
      )}

      {hasChild && (
        <ItemArrow
          {...ownerState}
          icon={navItem.subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'}
          className={navSectionClasses.item.arrow}
          sx={slotProps?.arrow}
        />
      )}
    </ItemRoot>
  );
}

// ----------------------------------------------------------------------

type StyledState = Pick<NavItemProps, 'open' | 'active' | 'disabled'> & {
  variant: 'rootItem' | 'subItem';
  sx?: any;
};

const shouldForwardProp = (prop: string) =>
  !['open', 'active', 'disabled', 'variant', 'sx'].includes(prop);

/**
 * @slot root
 */
const ItemRoot = styled(ButtonBase, { shouldForwardProp })<StyledState>(({
  active,
  open,
}) => {
  const rootItemStyles: any = {
    padding: 'var(--nav-item-root-padding)',
    minHeight: 'var(--nav-item-root-height)',
    ...(open && {
      color: 'var(--nav-item-root-open-color)',
      backgroundColor: 'var(--nav-item-root-open-bg)',
    }),
    ...(active && {
      color: 'var(--nav-item-root-active-color)',
      backgroundColor: 'var(--nav-item-root-active-bg)',
      '&:hover': { backgroundColor: 'var(--nav-item-root-active-hover-bg)' },
    }),
  };

  const subItemStyles: any = {
    padding: 'var(--nav-item-sub-padding)',
    minHeight: 'var(--nav-item-sub-height)',
    color: tokens.colors.text.secondary,
    ...(open && {
      color: 'var(--nav-item-sub-open-color)',
      backgroundColor: 'var(--nav-item-sub-open-bg)',
    }),
    ...(active && {
      color: 'var(--nav-item-sub-active-color)',
      backgroundColor: 'var(--nav-item-sub-active-bg)',
    }),
  };

  return {
    width: '100%',
    flexShrink: 0,
    color: 'var(--nav-item-color)',
    borderRadius: 'var(--nav-item-radius)',
    '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
    variants: [
      { props: { variant: 'rootItem' }, style: rootItemStyles },
      { props: { variant: 'subItem' }, style: subItemStyles },
      { props: { disabled: true }, style: navItemStyles.disabled },
    ],
  };
});

/**
 * @slot icon
 */
const ItemIcon = styled('span', { shouldForwardProp })<StyledState>(() => ({
  ...navItemStyles.icon,
  width: 'var(--nav-icon-size)',
  height: 'var(--nav-icon-size)',
  margin: 'var(--nav-icon-root-margin)',
  variants: [{ props: { variant: 'subItem' }, style: { margin: 'var(--nav-icon-sub-margin)' } }],
}));

/**
 * @slot title
 */
const ItemTitle = styled('span', { shouldForwardProp })<StyledState>(() => ({
  ...navItemStyles.title(),
  ...tokens.typography.body2,
  whiteSpace: 'nowrap',
  fontWeight: tokens.typography.fontWeightMedium,
  variants: [
    { props: { active: true }, style: { fontWeight: tokens.typography.fontWeightSemiBold } },
  ],
}));

/**
 * @slot caption icon
 */
const ItemCaptionIcon = styled(Iconify, { shouldForwardProp })<StyledState>(() => ({
  ...navItemStyles.captionIcon,
  color: 'var(--nav-item-caption-color)',
  variants: [{ props: { variant: 'rootItem' }, style: { marginLeft: tokens.spacing(0.75) } }],
}));

/**
 * @slot info
 */
const ItemInfo = styled('span', { shouldForwardProp })<StyledState>(() => ({
  ...navItemStyles.info,
}));

/**
 * @slot arrow
 */
const ItemArrow = styled(Iconify, { shouldForwardProp })<StyledState>(() => ({
  ...navItemStyles.arrow(),
  variants: [{ props: { variant: 'subItem' }, style: { marginRight: tokens.spacing(-0.5) } }],
}));

