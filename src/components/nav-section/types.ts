import type { ReactNode } from 'react';

// ----------------------------------------------------------------------

export type NavItemState = {
  active?: boolean;
  open?: boolean;
  disabled?: boolean;
};

export type NavItemBaseProps = {
  title: string;
  path: string;
  icon?: ReactNode;
  info?: ReactNode;
  caption?: string;
  disabled?: boolean;
  role?: string;
  roles?: string[];
  children?: any;
};

export type NavItemDataProps = {
  path: string;
  title: string;
  icon?: ReactNode;
  info?: ReactNode;
  caption?: string;
  disabled?: boolean;
  deepMatch?: boolean;
  allowedRoles?: string | string[];
  children?: NavItemDataProps[];
};

export type NavItemProps = NavItemBaseProps & {
  item?: NavItemBaseProps;
  depth?: number;
  open?: boolean;
  active?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  hasChild?: boolean;
  externalLink?: boolean;
  enabledRootRedirect?: boolean;
  render?: any;
  slotProps?: {
    sx?: any;
    icon?: any;
    texts?: any;
    title?: any;
    caption?: any;
    info?: any;
    arrow?: any;
    rootItem?: any;
    subItem?: any;
  };
  className?: string; // Add className
  sx?: any; // Add sx
};

export type NavListProps = {
  data: NavItemDataProps;
  depth: number;
  hasChild: boolean;
  render?: any;
  slotProps?: any;
  enabledRootRedirect?: boolean;
  cssVars?: any;
  checkPermissions?: (allowedRoles?: string | string[]) => boolean;
};

export type NavSubListProps = {
  data: NavItemDataProps[];
  depth: number;
  render?: any;
  slotProps?: any;
  enabledRootRedirect?: boolean;
  cssVars?: any;
};

export type NavGroupProps = {
  items: NavItemDataProps[];
  subheader?: string;
  render?: any;
  slotProps?: any;
  enabledRootRedirect?: boolean;
  cssVars?: any;
};

export type NavSectionProps = React.ComponentProps<'div'> & {
  data: {
    subheader: string;
    items: NavItemDataProps[];
  }[];
  render?: any;
  slotProps?: any;
  enabledRootRedirect?: boolean;
  cssVars?: any;
};
