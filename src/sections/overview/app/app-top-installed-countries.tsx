import type { IconifyName } from 'src/components/iconify';

import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { CardWrapper as Card, CardHeaderWrapper as CardHeader } from 'src/components/circuit-ui';

import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { FlagIcon } from 'src/components/flag-icon';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = any & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    apple: number;
    android: number;
    windows: number;
    countryCode: string;
    countryName: string;
  }[];
};

export function AppTopInstalledCountries({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{ minHeight: 254 }}>
        {useCircuitLayoutsWithPathname() ? (
          <div className="flex flex-col gap-3 p-3 min-w-[360px]">
            {list.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <Box
            sx={{
              p: 3,
              gap: 3,
              minWidth: 360,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {list.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Box>
        )}
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CountryItemProps = any & {
  item: Props['list'][number];
};

function Item({ item, sx, ...other }: CountryItemProps) {
  const useCircuit = useCircuitLayoutsWithPathname();
  
  const largeItem = () => useCircuit ? (
    <div className="flex items-center gap-1 min-w-[120px]">
      <FlagIcon code={item.countryCode} />
      <Typography component="span" variant="subtitle2" noWrap>
        {item.countryName}
      </Typography>
    </div>
  ) : (
    <Box
      sx={{
        gap: 1,
        minWidth: 120,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FlagIcon code={item.countryCode} />
      <Typography component="span" variant="subtitle2" noWrap>
        {item.countryName}
      </Typography>
    </Box>
  );

  const smallItem = (icon: IconifyName, system: number) => useCircuit ? (
    <div className="flex items-center gap-0.5 min-w-[80px] text-sm">
      <Iconify icon={icon} width={14} sx={{ color: 'text.secondary' }} />
      {fShortenNumber(system)}
    </div>
  ) : (
    <Box
      sx={{
        gap: 0.5,
        minWidth: 80,
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
      }}
    >
      <Iconify icon={icon} width={14} sx={{ color: 'text.secondary' }} />
      {fShortenNumber(system)}
    </Box>
  );

  return useCircuit ? (
    <div className="flex items-center gap-2">
      {largeItem()}
      {smallItem('mingcute:android-2-fill', item.android)}
      {smallItem('mingcute:windows-fill', item.windows)}
      {smallItem('mingcute:apple-fill', item.apple)}
    </div>
  ) : (
    <Box
      sx={[{ gap: 2, display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      {largeItem()}
      {smallItem('mingcute:android-2-fill', item.android)}
      {smallItem('mingcute:windows-fill', item.windows)}
      {smallItem('mingcute:apple-fill', item.apple)}
    </Box>
  );
}
