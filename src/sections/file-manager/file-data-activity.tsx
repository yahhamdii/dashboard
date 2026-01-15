import type { ChartOptions } from 'src/components/chart';

import { useState, useCallback } from 'react';

import { tokens } from 'src/theme/design-tokens';
import { varAlpha } from 'minimal-shared/utils';

import { CardWrapper as Card, CardHeaderWrapper as CardHeader } from 'src/components/circuit-ui';

import { fData } from 'src/utils/format-number';

import { Chart, useChart, ChartSelect } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = any & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      name: string;
      categories?: string[];
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ChartOptions;
  };
};

export function FileDataActivity({ title, subheader, chart, sx, ...other }: Props) {
  const [selectedSeries, setSelectedSeries] = useState('Yearly');

  const currentSeries = chart.series.find((i) => i.name === selectedSeries);

  const chartColors = chart.colors ?? [
    tokens.colors.primary.main,
    tokens.colors.error.main,
    tokens.colors.warning.main,
    varAlpha(tokens.colors.grey['500Channel'], 0.48),
  ];

  const chartOptions = useChart({
    chart: { stacked: true },
    colors: chartColors,
    stroke: { width: 0 },
    legend: { show: true },
    xaxis: { categories: currentSeries?.categories },
    tooltip: { y: { formatter: (value: number) => fData(value) } },
    ...chart.options,
  });

  const handleChangeSeries = useCallback((newValue: string) => {
    setSelectedSeries(newValue);
  }, []);

  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ChartSelect
            options={chart.series.map((i) => i.name)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
      />

      <Chart
        type="bar"
        series={currentSeries?.data}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 370,
        }}
      />
    </Card>
  );
}
