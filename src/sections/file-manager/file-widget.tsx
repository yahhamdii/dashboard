import type { CardProps } from '@mui/material/Card';

import {
  BoxWrapper as Box,
  CardWrapper as Card,
  IconButtonWrapper,
  LinearProgressWrapper as LinearProgress,
  TypographyWrapper as Typography
} from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fData } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  value: number;
  total: number;
  icon: React.ReactNode;
};

export function FileWidget({ sx, icon, title, value, total, ...other }: Props) {
  return (
    <Card sx={[{ p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <IconButtonWrapper sx={{ top: 8, right: 8, position: 'absolute' }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButtonWrapper>

      {icon}

      <Typography variant="h6" sx={{ mt: 3 }}>
        {title}
      </Typography>

      <LinearProgress value={24} variant="determinate" color="inherit" sx={{ my: 2, height: 6 }} />

      {useCircuitLayoutsWithPathname() ? (
        <div className="flex gap-0.5 justify-end text-sm">
          <span className="text-xs text-gray-500">
            {fData(value)}
          </span>
          {` / ${fData(total)}`}
        </div>
      ) : (
        <div className="flex gap-0.5 justify-end text-sm">
          <span className="text-xs text-gray-500">
            {fData(value)}
          </span>
          {` / ${fData(total)}`}
        </div>
      )}
    </Card>
  );
}
