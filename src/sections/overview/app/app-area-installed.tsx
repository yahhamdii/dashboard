import type { ChartOptions } from 'src/components/chart';

import { useState, useCallback } from 'react';
import { tokens } from 'src/theme/design-tokens';

import { CardWrapper as Card, CardHeaderWrapper as CardHeader } from 'src/components/circuit-ui';

import { fNumber, fShortenNumber } from 'src/utils/format-number';

import { Chart, useChart, ChartSelect, ChartLegends } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = any & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ChartOptions;
  };
};

export function AppAreaInstalled({ title, subheader, chart, sx, ...other }: Props) {
  const [selectedSeries, setSelectedSeries] = useState('2023');

  const chartColors = chart.colors ?? [
    tokens.colors.primary.dark,
    tokens.colors.warning.main,
    tokens.colors.info.main,
  ];

  const chartOptions = useChart({
    chart: { stacked: true },
    colors: chartColors,
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    tooltip: { y: { formatter: (value: number) => fNumber(value) } },
    plotOptions: { bar: { columnWidth: '40%' } },
    ...chart.options,
  });

  const handleChangeSeries = useCallback((newValue: string) => {
    setSelectedSeries(newValue);
  }, []);

  const currentSeries = chart.series.find((i) => i.name === selectedSeries);

  return (
    <Card sx={sx} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ChartSelect
            options={chart.series.map((item) => item.name)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
        sx={{ mb: 3 }}
      />

      <ChartLegends
        colors={chartOptions?.colors}
        labels={chart.series[0].data.map((item) => item.name)}
        values={[fShortenNumber(1234), fShortenNumber(6789), fShortenNumber(1012)]}
        sx={{ px: 3, gap: 3 }}
      />

      <Chart
        key={selectedSeries}
        type="bar"
        series={currentSeries?.data}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 320,
        }}
      />
    </Card>
  );
}
