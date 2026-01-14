import type { BoxProps } from '@mui/material/Box';

import {
  BoxWrapper as Box,
  ButtonWrapper as Button,
  IconButtonWrapper as IconButton,
  IconButtonWrapper
} from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title: string;
  link?: string;
  subtitle?: string;
  collapse?: boolean;
  onOpen?: () => void;
  onCollapse?: () => void;
};

export function FileManagerPanel({
  sx,
  link,
  title,
  onOpen,
  subtitle,
  collapse,
  onCollapse,
  ...other
}: Props) {
  const useCircuit = useCircuitLayoutsWithPathname();

  // Filtrer les props MUI spécifiques
  const {
    sx: _sx,
    ...divProps
  } = other as any;

  return useCircuit ? (
    <div className={`flex items-center mb-3 ${sx ? '' : ''}`} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      <div className="flex-1">
        <div className="flex gap-1 items-center text-lg">
          {title}

          <IconButtonWrapper
            size="small"
            color="primary"
            onClick={onOpen}
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <Iconify width={16} icon="mingcute:add-line" />
          </IconButtonWrapper>
        </div>

        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      {link && (
        <Button
          href={link}
          component={RouterLink}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      )}

      {onCollapse && (
        <IconButtonWrapper onClick={onCollapse}>
          <Iconify icon={collapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-upward-fill'} />
        </IconButtonWrapper>
      )}
    </div>
  ) : (
    <Box
      sx={[
        {
          mb: 3,
          display: 'flex',
          alignItems: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ flex: '1 1 auto' }}>
        <Box
          sx={{
            gap: 1,
            display: 'flex',
            typography: 'h6',
            alignItems: 'center',
          }}
        >
          {title}

          <IconButton
            size="small"
            color="primary"
            onClick={onOpen}
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <Iconify width={16} icon="mingcute:add-line" />
          </IconButton>
        </Box>

        {subtitle && (
          <Box sx={{ typography: 'body2', color: 'text.disabled', mt: 0.5 }}>{subtitle}</Box>
        )}
      </Box>

      {link && (
        <Button
          href={link}
          component={RouterLink}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      )}

      {onCollapse && (
        <IconButton onClick={onCollapse}>
          <Iconify icon={collapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-upward-fill'} />
        </IconButton>
      )}
    </Box>
  );
}
