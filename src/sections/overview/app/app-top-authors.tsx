
import { orderBy } from 'es-toolkit';
import { varAlpha } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { CardWrapper as Card, CardHeaderWrapper as CardHeader, AvatarWrapper } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';
import { tokens } from 'src/theme/design-tokens';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = any & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    avatarUrl: string;
    totalFavorites: number;
  }[];
};

export function AppTopAuthors({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box
        sx={{
          p: 3,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {orderBy(list, ['totalFavorites'], ['desc']).map((item, index) => (
          <Item key={item.id} item={item} index={index} />
        ))}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = any & {
  index: number;
  item: Props['list'][number];
};

function Item({ item, index, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={[
        {
          gap: 2,
          display: 'flex',
          alignItems: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <AvatarWrapper alt={item.name} src={item.avatarUrl} />

      <Box sx={{ flex: '1 1 auto' }}>
        <Box sx={{ typography: 'subtitle2' }}>{item.name}</Box>
        <Box
          sx={{
            mt: 0.5,
            gap: 0.5,
            display: 'flex',
            alignItems: 'center',
            typography: 'caption',
            color: tokens.colors.text.secondary,
          }}
        >
          <Iconify icon="solar:heart-bold" width={14} />
          {fShortenNumber(item.totalFavorites)}
        </Box>
      </Box>

      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          color: tokens.colors.primary.main,
          justifyContent: 'center',
          bgcolor: varAlpha(tokens.colors.primary.mainChannel, 0.08),
          ...(index === 1 && {
            color: tokens.colors.info.main,
            bgcolor: varAlpha(tokens.colors.info.mainChannel, 0.08),
          }),
          ...(index === 2 && {
            color: tokens.colors.error.main,
            bgcolor: varAlpha(tokens.colors.error.mainChannel, 0.08),
          }),
        }}
      >
        <Iconify width={24} icon="solar:cup-star-bold" />
      </Box>
    </Box>
  );
}
