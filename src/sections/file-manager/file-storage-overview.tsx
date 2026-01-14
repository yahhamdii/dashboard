import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

import { CardWrapper as Card } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fData } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  total: number;
  data: {
    name: string;
    usedStorage: number;
    filesCount: number;
    icon: React.ReactNode;
  }[];
  chart: {
    colors?: string[];
    series: number;
    options?: ChartOptions;
  };
};

export function FileStorageOverview({ data, total, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.secondary.main, theme.palette.secondary.light];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0], opacity: 1 },
          { offset: 100, color: chartColors[1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 40,
        startAngle: -90,
        endAngle: 90,
        hollow: { margin: -24 },
        track: { margin: -24 },
        dataLabels: {
          name: { offsetY: 8 },
          value: { offsetY: -36 },
          total: {
            label: `Used of ${fData(total)} / ${fData(total * 2)}`,
            color: theme.vars.palette.text.disabled,
            fontSize: theme.typography.caption.fontSize as string,
            fontWeight: theme.typography.caption.fontWeight,
          },
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card sx={sx} {...other}>
      <Chart
        type="radialBar"
        series={[chart.series]}
        options={chartOptions}
        slotProps={{ loading: { p: 3 } }}
        sx={{ mx: 'auto', width: 240, height: 240 }}
      />

      {useCircuitLayoutsWithPathname() ? (
        <div className="flex flex-col gap-3 px-3 pb-5 -mt-4 z-10">
          {data.map((category) => (
            <div key={category.name} className="flex items-center gap-2 text-sm">
              <div className="w-9 h-9">{category.icon}</div>

              <ListItemText
                primary={category.name}
                secondary={`${category.filesCount} files`}
                slotProps={{
                  secondary: { sx: { mt: 0.5, typography: 'caption', color: 'text.disabled' } },
                }}
              />

              <span> {fData(category.usedStorage)} </span>
            </div>
          ))}
        </div>
      ) : (
        <Box
          sx={{
            px: 3,
            pb: 5,
            mt: -4,
            gap: 3,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {data.map((category) => (
            <div key={category.name} className="flex items-center gap-2 text-sm">
              <div className="w-9 h-9">{category.icon}</div>

              <ListItemText
                primary={category.name}
                secondary={`${category.filesCount} files`}
                slotProps={{
                  secondary: { sx: { mt: 0.5, typography: 'caption', color: 'text.disabled' } },
                }}
              />

              <span> {fData(category.usedStorage)} </span>
            </div>
          ))}
        </Box>
      )}
    </Card>
  );
}
