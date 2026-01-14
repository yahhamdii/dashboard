'use client';

import type { IconProps } from '@iconify/react';
import type { IconifyName } from './register-icons';

import { useId } from 'react';
import { Icon } from '@iconify/react';
import { mergeClasses } from 'minimal-shared/utils';

import { iconifyClasses } from './classes';
import { allIconNames, registerIcons } from './register-icons';

// ----------------------------------------------------------------------

export type IconifyProps = Omit<IconProps, 'icon'> & {
  icon: IconifyName;
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
};

export function Iconify({ className, icon, width = 20, height, sx, style, ...other }: IconifyProps) {
  const uniqueId = useId();

  if (!allIconNames.includes(icon)) {
    console.warn(
      [
        `Icon "${icon}" is currently loaded online, which may cause flickering effects.`,
        `To ensure a smoother experience, please register your icon collection for offline use.`,
        `More information is available at: https://docs.minimals.cc/icons/`,
      ].join('\n')
    );
  }

  registerIcons();

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const iconStyles: React.CSSProperties = {
    width,
    flexShrink: 0,
    height: height ?? width,
    display: 'inline-flex',
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <Icon
      ssr
      id={uniqueId}
      icon={icon}
      className={mergeClasses([iconifyClasses.root, className])}
      style={iconStyles}
      {...other}
    />
  );
}
