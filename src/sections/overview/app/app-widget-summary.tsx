import React from 'react';
import type { ChartOptions } from 'src/components/chart';

import { tokens } from 'src/theme/design-tokens';

import { CardWrapper as Card } from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fNumber, fPercent } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = React.ComponentProps<typeof Card> & {
  title: string;
  total: number;
  percent: number;
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
    options?: ChartOptions;
  };
  sx?: any;
};

export function AppWidgetSummary({ title, percent, total, chart, sx, ...other }: Props) {
  const chartColors = chart.colors ?? [tokens.colors.primary.main];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    tooltip: {
      y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
    },
    plotOptions: { bar: { borderRadius: 1.5, columnWidth: '64%' } },
    ...chart.options,
  });

  const renderTrending = () => {
    const useCircuit = useCircuitLayoutsWithPathname();

    if (useCircuit) {
      return (
        <div className="flex gap-0.5 items-center">
          <Iconify
            width={24}
            icon={
              percent < 0
                ? 'solar:double-alt-arrow-down-bold-duotone'
                : 'solar:double-alt-arrow-up-bold-duotone'
            }
            style={{
              flexShrink: 0,
              color: tokens.colors.success.main,
              ...(percent < 0 && { color: tokens.colors.error.main }),
            }}
          />

          <span className="text-sm">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </span>

          <span className="text-xs text-gray-500">
            last 7 days
          </span>
        </div>
      );
    }

    return (
      <div style={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
        <Iconify
          width={24}
          icon={
            percent < 0
              ? 'solar:double-alt-arrow-down-bold-duotone'
              : 'solar:double-alt-arrow-up-bold-duotone'
          }
          style={{
            flexShrink: 0,
            color: tokens.colors.success.main,
            ...(percent < 0 && { color: tokens.colors.error.main }),
          }}
        />

        <span style={{ fontSize: tokens.typography.pxToRem(14), fontWeight: 600 }}>
          {percent > 0 && '+'}
          {fPercent(percent)}
        </span>

        <span style={{ fontSize: tokens.typography.pxToRem(14), fontWeight: 400, color: tokens.colors.text.secondary }}>
          last 7 days
        </span>
      </div>
    );
  };

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const cardStyles: React.CSSProperties = {
    padding: '24px',
    display: 'flex',
    zIndex: 'unset',
    overflow: 'unset',
    alignItems: 'center',
    ...sxStyles,
  };

  return (
    <Card
      style={cardStyles}
      {...other}
    >
      <div className="flex-grow">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-3xl font-bold mt-1.5 mb-1">{fNumber(total)}</div>
        {renderTrending()}
      </div>

      <Chart
        type="bar"
        series={[{ data: chart.series }]}
        options={chartOptions}
        sx={{ width: 60, height: 40 }}
      />
    </Card>
  );
}
