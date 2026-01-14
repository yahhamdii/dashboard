import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
};

export function AppWelcome({ title, description, action, img, sx, ...other }: Props) {
  const useCircuit = useCircuitLayoutsWithPathname();
  
  const content = (
    <>
      {useCircuit ? (
        <div className="flex flex-1 flex-col items-center md:items-start">
          <Typography variant="h4" sx={{ whiteSpace: 'pre-line', mb: 1 }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.64, maxWidth: 360, ...(action && { mb: 3 }) }}>
            {description}
          </Typography>

          {action && action}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center md:items-start">
          <Typography variant="h4" sx={{ whiteSpace: 'pre-line', mb: 1 }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.64, maxWidth: 360, ...(action && { mb: 3 }) }}>
            {description}
          </Typography>

          {action && action}
        </div>
      )}

      {img && <div className="max-w-[260px]">{img}</div>}
    </>
  );
  
  return useCircuit ? (
    <div
      className="pt-5 pb-5 pr-3 pl-3 md:pl-5 gap-5 rounded-lg flex flex-col md:flex-row md:h-full relative items-center text-white text-center md:text-left"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, #212121 75%), url(${CONFIG.assetsDir}/assets/background/background-5.webp)`,
        border: '1px solid #424242',
      }}
    >
      {content}
    </div>
  ) : (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.88)} 0%, ${theme.vars.palette.grey[900]} 75%)`,
              `url(${CONFIG.assetsDir}/assets/background/background-5.webp)`,
            ],
          }),
          pt: 5,
          pb: 5,
          pr: 3,
          gap: 5,
          borderRadius: 2,
          display: 'flex',
          height: { md: 1 },
          position: 'relative',
          pl: { xs: 3, md: 5 },
          alignItems: 'center',
          color: 'common.white',
          textAlign: { xs: 'center', md: 'left' },
          flexDirection: { xs: 'column', md: 'row' },
          border: `solid 1px ${theme.vars.palette.grey[800]}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {content}
    </Box>
  );
}
