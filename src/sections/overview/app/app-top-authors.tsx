import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { orderBy } from 'es-toolkit';
import { varAlpha } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { CardWrapper as Card, CardHeaderWrapper as CardHeader, AvatarWrapper } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
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

      {useCircuitLayoutsWithPathname() ? (
        <div className="flex flex-col gap-3 p-3">
          {orderBy(list, ['totalFavorites'], ['desc']).map((item, index) => (
            <Item key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
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
      )}
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  index: number;
  item: Props['list'][number];
};

function Item({ item, index, sx, ...other }: ItemProps) {
  const useCircuit = useCircuitLayoutsWithPathname();
  
  // Filtrer les props MUI spécifiques
  const {
    sx: _sx,
    ...divProps
  } = other as any;
  
  return useCircuit ? (
    <div className={`flex items-center gap-2 ${sx ? '' : ''}`} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      <AvatarWrapper alt={item.name} src={item.avatarUrl} />

      <div className="flex-1">
        <span className="text-sm font-medium">{item.name}</span>
        <div className="flex items-center gap-0.5 mt-0.5 text-xs text-gray-500">
          <Iconify icon="solar:heart-bold" width={14} />
          {fShortenNumber(item.totalFavorites)}
        </div>
      </div>

      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          index === 0 ? 'text-blue-600 bg-blue-50' :
          index === 1 ? 'text-cyan-600 bg-cyan-50' :
          'text-red-600 bg-red-50'
        }`}
      >
        <Iconify width={24} icon="solar:cup-star-bold" />
      </div>
    </div>
  ) : (
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
            color: 'text.secondary',
          }}
        >
          <Iconify icon="solar:heart-bold" width={14} />
          {fShortenNumber(item.totalFavorites)}
        </Box>
      </Box>

      <Box
        sx={[
          (theme) => ({
            width: 40,
            height: 40,
            display: 'flex',
            borderRadius: '50%',
            alignItems: 'center',
            color: 'primary.main',
            justifyContent: 'center',
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
            ...(index === 1 && {
              color: 'info.main',
              bgcolor: varAlpha(theme.vars.palette.info.mainChannel, 0.08),
            }),
            ...(index === 2 && {
              color: 'error.main',
              bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
            }),
          }),
        ]}
      >
        <Iconify width={24} icon="solar:cup-star-bold" />
      </Box>
    </Box>
  );
}
