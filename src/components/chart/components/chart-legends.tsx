'use client';

import React from 'react';

import { mergeClasses } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { chartClasses } from '../classes';

// ----------------------------------------------------------------------

export type ChartLegendsProps = React.ComponentProps<'ul'> & {
  labels?: string[];
  colors?: string[];
  values?: string[];
  sublabels?: string[];
  icons?: React.ReactNode[];
  sx?: any;
  slotProps?: {
    wrapper?: React.ComponentProps<'li'> & { sx?: any };
    root?: React.ComponentProps<'div'>;
    dot?: React.ComponentProps<'span'>;
    icon?: React.ComponentProps<'span'>;
    value?: React.ComponentProps<'span'>;
    label?: React.ComponentProps<'span'>;
  };
};

export function ChartLegends({
  sx,
  className,
  slotProps,
  icons = [],
  values = [],
  labels = [],
  colors = [],
  sublabels = [],
  style,
  ...other
}: ChartLegendsProps) {
  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const listStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacing(2),
    ...sxStyles,
    ...(style || {}),
  };

  const wrapperMergedSx = Array.isArray(slotProps?.wrapper?.sx) ? slotProps.wrapper.sx : [slotProps?.wrapper?.sx];
  const wrapperSxStyles = wrapperMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  return (
    <ul className={mergeClasses([chartClasses.legends.root, className])} style={listStyles} {...other}>
      {labels.map((series, index) => {
        const wrapperStyles: React.CSSProperties = {
          display: 'inline-flex',
          flexDirection: 'column',
          '--icon-color': colors[index],
          ...wrapperSxStyles,
        };

        const rootStyles: React.CSSProperties = {
          gap: 6,
          alignItems: 'center',
          display: 'inline-flex',
          justifyContent: 'flex-start',
          fontSize: tokens.typography.pxToRem(13),
          fontWeight: tokens.typography.fontWeightMedium,
        };

        const iconStyles: React.CSSProperties = {
          display: 'inline-flex',
          color: 'var(--icon-color)',
        };

        const dotStyles: React.CSSProperties = {
          width: 12,
          height: 12,
          flexShrink: 0,
          display: 'flex',
          borderRadius: '50%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--icon-color)',
          backgroundColor: 'currentColor',
        };

        const valueStyles: React.CSSProperties = {
          fontSize: tokens.typography.h6.fontSize,
          fontWeight: tokens.typography.h6.fontWeight,
          marginTop: tokens.spacing(1),
        };

        return (
          <li
            key={series}
            className={chartClasses.legends.item.wrapper}
            style={wrapperStyles}
            {...slotProps?.wrapper}
          >
            <div className={chartClasses.legends.item.root} style={rootStyles} {...slotProps?.root}>
              {icons.length ? (
                <span className={chartClasses.legends.item.icon} style={iconStyles} {...slotProps?.icon}>
                  <span style={{ width: 20, height: 20, display: 'inline-block' }}>
                    {icons[index]}
                  </span>
                </span>
              ) : (
                <span className={chartClasses.legends.item.dot} style={dotStyles} {...slotProps?.dot} />
              )}

              <span className={chartClasses.legends.item.label} style={{ flexShrink: 0 }} {...slotProps?.label}>
                {series}
                {!!sublabels.length && <> {` (${sublabels[index]})`}</>}
              </span>
            </div>

            {values && (
              <span className={chartClasses.legends.item.value} style={valueStyles} {...slotProps?.value}>
                {values[index]}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
