import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { CardWrapper as Card } from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fNumber, fPercent } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  chart: {
    colors?: string[];
    categories: string[];
    series: number[];
    options?: ChartOptions;
  };
};

export function AppWidgetSummary({ title, percent, total, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.main];

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
            sx={{
              flexShrink: 0,
              color: 'success.main',
              ...(percent < 0 && { color: 'error.main' }),
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
      <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
        <Iconify
          width={24}
          icon={
            percent < 0
              ? 'solar:double-alt-arrow-down-bold-duotone'
              : 'solar:double-alt-arrow-up-bold-duotone'
          }
          sx={{
            flexShrink: 0,
            color: 'success.main',
            ...(percent < 0 && { color: 'error.main' }),
          }}
        />

        <Box component="span" sx={{ typography: 'subtitle2' }}>
          {percent > 0 && '+'}
          {fPercent(percent)}
        </Box>

        <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
          last 7 days
        </Box>
      </Box>
    );
  };

  return (
    <Card
      sx={[
        () => ({
          p: 3,
          display: 'flex',
          zIndex: 'unset',
          overflow: 'unset',
          alignItems: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {useCircuitLayoutsWithPathname() ? (
        <div className="flex-grow">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-3xl font-bold mt-1.5 mb-1">{fNumber(total)}</div>
          {renderTrending()}
        </div>
      ) : (
        <div className="flex-grow">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-3xl font-bold mt-1.5 mb-1">{fNumber(total)}</div>
          {renderTrending()}
        </div>
      )}

      <Chart
        type="bar"
        series={[{ data: chart.series }]}
        options={chartOptions}
        sx={{ width: 60, height: 40 }}
      />
    </Card>
  );
}
