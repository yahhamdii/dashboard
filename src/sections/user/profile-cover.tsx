import type { BoxProps } from '@mui/material/Box';
import type { IUserProfileCover } from 'src/types/user';

import { varAlpha } from 'minimal-shared/utils';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import ListItemText from '@mui/material/ListItemText';

import { AvatarWrapper } from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export function ProfileCover({
  sx,
  name,
  role,
  coverUrl,
  avatarUrl,
  ...other
}: BoxProps & IUserProfileCover) {
  const useCircuit = useCircuitLayoutsWithPathname();
  
  const boxContent = useCircuit ? (
    <div className="flex flex-col md:flex-row left-0 md:left-6 bottom-0 md:bottom-6 z-0 md:z-10 pt-6 md:pt-0 relative md:absolute">
      <AvatarWrapper
        alt={name}
        src={avatarUrl}
        size="large"
        sx={[
          (theme) => ({
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.vars.palette.common.white}`,
          }),
        ]}
      >
        {name?.charAt(0).toUpperCase()}
      </AvatarWrapper>

      <ListItemText
        primary={name}
        secondary={role}
        slotProps={{
          primary: { sx: { typography: 'h4' } },
          secondary: {
            sx: { mt: 0.5, opacity: 0.48, color: 'inherit' },
          },
        }}
        sx={{ mt: 3, ml: { md: 3 }, textAlign: { xs: 'center', md: 'unset' } }}
      />
    </div>
  ) : (
    <div className="flex flex-col md:flex-row left-0 md:left-6 bottom-0 md:bottom-6 z-0 md:z-10 pt-6 md:pt-0 relative md:absolute">
      <AvatarWrapper
        alt={name}
        src={avatarUrl}
        size="large"
        sx={[
          (theme) => ({
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.vars.palette.common.white}`,
          }),
        ]}
      >
        {name?.charAt(0).toUpperCase()}
      </AvatarWrapper>

      <ListItemText
        primary={name}
        secondary={role}
        slotProps={{
          primary: { sx: { typography: 'h4' } },
          secondary: {
            sx: { mt: 0.5, opacity: 0.48, color: 'inherit' },
          },
        }}
        sx={{ mt: 3, ml: { md: 3 }, textAlign: { xs: 'center', md: 'unset' } }}
      />
    </div>
  );
  
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)}, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.8)})`,
              `url(${coverUrl})`,
            ],
          }),
          height: 1,
          color: 'common.white',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {boxContent}
    </Box>
  );
}
