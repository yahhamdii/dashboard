import type { BoxProps } from '@mui/material/Box';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { UsePopoverReturn } from 'minimal-shared/hooks';
import type { AvatarGroupProps } from '@mui/material/AvatarGroup';
import type { IFileManager } from 'src/types/file';
import type { FileThumbnailProps } from 'src/components/file-thumbnail';

import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { TypographyWrapper as Typography, CheckboxWrapper as Checkbox, AvatarWrapper, IconButtonWrapper } from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { FileThumbnail } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

const Z_INDEXES = {
  overlay: 1,
  actions: 2,
} as const;

export type FileItemProps = React.ComponentProps<typeof FileItem>;

export const FileItem = styled(Paper, {
  shouldForwardProp: (prop: string) => !['selected', 'sx'].includes(prop),
})<{ selected?: boolean }>(({ selected, theme }) => {
  const hoverStyles = {
    boxShadow: theme.vars.customShadows.z20,
    backgroundColor: theme.vars.palette.background.paper,
  };

  return {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2.5),
    backgroundColor: 'transparent',
    borderRadius: Number(theme.shape.borderRadius) * 2,
    '&:hover': hoverStyles,
    ...(selected && hoverStyles),
  };
});

export const FileItemActionOverlay = styled('span')({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  position: 'absolute',
  borderRadius: 'inherit',
  zIndex: Z_INDEXES.overlay,
});

// ----------------------------------------------------------------------

export type FileItemIconProps = BoxProps &
  Pick<CheckboxProps, 'checked' | 'onChange'> & {
    hovered?: boolean;
    fileType?: FileThumbnailProps['file'];
  };

export function FileItemIcon({
  id,
  sx,
  fileType,
  checked,
  hovered,
  onChange,
  ...other
}: FileItemIconProps) {
  const renderIcon = () =>
    fileType ? (
      <FileThumbnail file={fileType} sx={{ width: 1, height: 1 }} />
    ) : (
      <Box
        component="img"
        src={`${CONFIG.assetsDir}/assets/icons/files/ic-folder.svg`}
        sx={{ width: 1, height: 1 }}
      />
    );

  return (
    <Box
      sx={[
        {
          width: 36,
          height: 36,
          display: 'inline-flex',
          zIndex: Z_INDEXES.actions,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {(hovered || checked) && onChange ? (
        <Checkbox
          checked={checked}
          onChange={onChange}
          icon={<Iconify icon="eva:radio-button-off-fill" width={22} />}
          checkedIcon={<Iconify icon="solar:check-circle-bold" width={22} />}
          slotProps={{
            input: {
              id: `${id}-checkbox`,
              'aria-label': `${id} checkbox`,
            },
          }}
          sx={{ p: 0, width: 1, height: 1 }}
        />
      ) : (
        renderIcon()
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export type FileItemInfoProps = BoxProps & {
  values: string[];
  type: 'file' | 'recent-file' | 'folder';
};

export function FileItemInfo({ type, title, values, sx, ...other }: FileItemInfoProps) {
  const renderTitle = () => (
    <Typography
      variant={['file', 'recent-file'].includes(type) ? 'subtitle2' : 'subtitle1'}
      sx={[
        (theme) => ({
          wordBreak: 'break-all',
          ...theme.mixins.maxLine({
            line: type === 'file' ? 2 : 1,
            persistent: type === 'file' ? theme.typography.subtitle2 : undefined,
          }),
        }),
      ]}
    >
      {title}
    </Typography>
  );

  const useCircuit = useCircuitLayoutsWithPathname();
  
  // Filtrer les props MUI spécifiques
  const {
    sx: _sx,
    ...divProps
  } = other as any;
  
  const renderDetails = () => {
    if (useCircuit) {
      return (
        <div className="flex flex-row items-center gap-1 text-xs text-gray-500">
          {values.map((value, index) => (
            <React.Fragment key={value}>
              {index > 0 && (
                <span className="w-0.5 h-0.5 flex-shrink-0 rounded-full bg-current" />
              )}
              <span className={index === values.length - 1 ? 'truncate' : 'whitespace-nowrap'}>
                {value}
              </span>
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    return (
      <Box
        sx={[
          (theme) => ({
            gap: 0.75,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            '& span': {
              '&:last-of-type': { ...theme.mixins.maxLine({ line: 1 }) },
              '&:not(:last-of-type)': { whiteSpace: 'nowrap' },
              '&:not(:first-of-type)::before': {
                content: '""',
                width: 2,
                height: 2,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
                margin: '0 0.75rem',
              },
            },
          }),
        ]}
      >
        {values.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </Box>
    );
  };

  return useCircuit ? (
    <div className={`flex flex-col gap-0.5 w-full ${sx ? '' : ''}`} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      {renderTitle()}
      {renderDetails()}
    </div>
  ) : (
    <Box
      sx={[
        {
          gap: 0.5,
          width: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderTitle()}
      {renderDetails()}
    </Box>
  );
}

// ----------------------------------------------------------------------

export type FileItemActionsProps = BoxProps &
  Pick<CheckboxProps, 'checked' | 'onChange'> & {
    openMenu: UsePopoverReturn['open'];
    onOpenMenu: UsePopoverReturn['onOpen'];
  };

export function FileItemActions({
  sx,
  id,
  checked,
  onChange,
  openMenu,
  onOpenMenu,
  ...other
}: FileItemActionsProps) {
  return (
    <Box
      sx={[
        {
          top: 8,
          right: 8,
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          zIndex: Z_INDEXES.actions,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={checked}
        onChange={onChange}
        slotProps={{
          input: {
            id: `favorite-${id}-checkbox`,
            'aria-label': `Favorite ${id} checkbox`,
          },
        }}
      />

      <IconButtonWrapper color={openMenu ? 'inherit' : 'default'} onClick={onOpenMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButtonWrapper>
    </Box>
  );
}

// ----------------------------------------------------------------------

export type FileItemAvatarProps = AvatarGroupProps & {
  sharedUsers: IFileManager['shared'];
};

export function FileItemAvatar({ sharedUsers, sx, ...other }: FileItemAvatarProps) {
  if (!sharedUsers?.length) {
    return null;
  }

  return (
    <div className="flex -space-x-2" style={{ display: 'inline-flex' }}>
      {sharedUsers.slice(0, 3).map((person) => (
        <AvatarWrapper key={person.id} alt={person.name} src={person.avatarUrl} size="small" sx={{ width: 24, height: 24, border: '2px solid white' }} />
      ))}
      {sharedUsers.length > 3 && (
        <AvatarWrapper size="small" sx={{ width: 24, height: 24, border: '2px solid white', bgcolor: 'grey.300' }}>
          +{sharedUsers.length - 3}
        </AvatarWrapper>
      )}
    </div>
  );
}
