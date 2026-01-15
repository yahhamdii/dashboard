'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import type { ChartProps } from './types';

import { mergeClasses } from 'minimal-shared/utils';

import { tokens } from 'src/theme/design-tokens';

import { chartClasses } from './classes';
import { ChartLoading } from './components';

// ----------------------------------------------------------------------

const LazyChart = lazy(() => import('react-apexcharts'));

// Simple NoSsr replacement
function NoSsr({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

import { convertSxToStyles } from 'src/components/circuit-ui/styles-utils';

export function Chart({
  sx,
  type,
  series,
  slotProps,
  className,
  options = {},
  style,
  ...other
}: ChartProps) {
  const renderFallback = () => <ChartLoading type={type} sx={slotProps?.loading} />;

  const sxStyles = convertSxToStyles(sx);

  const rootStyles: React.CSSProperties = {
    width: '100%',
    flexShrink: 0,
    position: 'relative',
    borderRadius: tokens.shape.borderRadius * 1.5,
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <div
      dir="ltr"
      className={mergeClasses([chartClasses.root, className])}
      style={rootStyles}
      {...other}
    >
      <NoSsr fallback={renderFallback()}>
        <Suspense fallback={renderFallback()}>
          <LazyChart type={type} series={series} options={options} width="100%" height="100%" />
        </Suspense>
      </NoSsr>
    </div>
  );
}
