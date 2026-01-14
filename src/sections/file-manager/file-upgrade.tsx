import type { CardProps } from '@mui/material/Card';

import {
  BoxWrapper as Box,
  StackWrapper as Stack,
  CardWrapper as Card,
  TypographyWrapper as Typography,
  ButtonWrapper as Button
} from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export function FileUpgrade({ sx, ...other }: CardProps) {
  return (
    <Card
      sx={[
        (theme) => ({
          p: 5,
          display: 'flex',
          alignItems: 'center',
          color: 'common.white',
          background: `radial-gradient(70% 70% at 0% 0%, ${theme.vars.palette.grey[700]} 0%, ${theme.vars.palette.common.black} 100%)`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {useCircuitLayoutsWithPathname() ? (
        <img
          alt="Upgrade Illustration"
          src={`${CONFIG.assetsDir}/assets/illustrations/illustration-upgrade.webp`}
          className="absolute right-4 z-[9] w-[120px] h-[150px]"
        />
      ) : (
        <img
          alt="Upgrade Illustration"
          src={`${CONFIG.assetsDir}/assets/illustrations/illustration-upgrade.webp`}
          style={{
            right: 16,
            zIndex: 9,
            width: 120,
            height: 150,
            position: 'absolute',
          }}
        />
      )}

      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-circle-1.svg`}
        sx={{
          zIndex: 8,
          width: 200,
          right: -32,
          height: 200,
          opacity: 0.12,
          position: 'absolute',
        }}
      />

      {useCircuitLayoutsWithPathname() ? (
        <div className="flex flex-col gap-3 items-start">
          <Typography variant="h6" sx={{ maxWidth: 180 }}>
            Upgrade your plan and get more space
          </Typography>

          <Button color="warning" variant="contained">
            Upgrade plan
          </Button>
        </div>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ maxWidth: 180 }}>
            Upgrade your plan and get more space
          </Typography>

          <Button color="warning" variant="contained">
            Upgrade plan
          </Button>
        </Box>
      )}
    </Card>
  );
}
