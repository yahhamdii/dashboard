'use client';

import React from 'react';
import type { ScrollbarProps } from './types';

import SimpleBar from 'simplebar-react';
import { mergeClasses } from 'minimal-shared/utils';

import { scrollbarClasses } from './classes';

// ----------------------------------------------------------------------

export function Scrollbar({
  sx,
  ref,
  children,
  className,
  slotProps,
  fillContent = true,
  style,
  ...other
}: ScrollbarProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const scrollbarStyles: React.CSSProperties = {
    minWidth: 0,
    minHeight: 0,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    ...sxStyles,
    ...(style || {}),
  };

  React.useEffect(() => {
    if (fillContent) {
      const contentElement = document.querySelector(`.${scrollbarClasses.root} .simplebar-content`);
      if (contentElement) {
        (contentElement as HTMLElement).style.display = 'flex';
        (contentElement as HTMLElement).style.flex = '1 1 auto';
        (contentElement as HTMLElement).style.minHeight = '100%';
        (contentElement as HTMLElement).style.flexDirection = 'column';
      }
    }
  }, [fillContent]);

  return (
    <SimpleBar
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={mergeClasses([scrollbarClasses.root, className])}
      style={scrollbarStyles}
      {...other}
    >
      {children}
    </SimpleBar>
  );
}
