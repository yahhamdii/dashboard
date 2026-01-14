import { varAlpha } from 'minimal-shared/utils';

import styled from '@emotion/styled';
import { tokens } from 'src/theme/design-tokens';

import { AvatarWrapper, BoxWrapper as Box } from 'src/components/circuit-ui';

import { Iconify } from 'src/components/iconify';
import { fileThumbnailClasses } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

export type FileItemProps = React.ComponentProps<typeof FileItem>;

export const FileItem = styled('div', {
  shouldForwardProp: (prop: string) => !['selected', 'sx', 'variant'].includes(prop),
})<{ selected?: boolean; variant?: string }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  padding: tokens.spacing(2),
  transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: tokens.shape.borderRadius,
  border: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.12)}`,
  '&:hover': {
    backgroundColor: tokens.colors.background.neutral,
  },
  ...(selected && {
    backgroundColor: tokens.colors.background.paper,
    boxShadow: tokens.customShadows.z20,
  }),
}));

export const FileItemIcon = ({
  id,
  hovered,
  checked,
  onChange,
  fileType,
  onMouseEnter,
  onMouseLeave,
}: {
  id: string;
  hovered: boolean;
  checked?: boolean;
  onChange?: () => void;
  fileType: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => (
  <Box
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    sx={{
      width: 36,
      height: 36,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      component="img"
      {...({ src: `/assets/icons/files/ic_${fileType}.svg` } as any)}
      sx={{
        width: 1,
        height: 1,
        ...((hovered || checked) && { display: 'none' }),
      }}
    />

    {(hovered || checked) && (
      <Box
        component="input"
        {...({ type: 'checkbox', checked, onChange } as any)}
        sx={{
          width: 20,
          height: 20,
          cursor: 'pointer',
        }}
      />
    )}
  </Box>
);

export const FileItemInfo = ({
  title,
  values,
  type,
}: {
  title: string;
  values: string[];
  type: 'file' | 'recent-file' | 'folder';
}) => (
  <Box
    sx={{
      ml: 2,
      flexGrow: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        ...tokens.typography.subtitle2,
      }}
    >
      {title}
    </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...tokens.typography.caption,
        color: tokens.colors.text.disabled,
      }}
    >
      {values.join(' • ')}
    </Box>
  </Box>
);

export const FileItemAvatar = ({ sharedUsers }: { sharedUsers?: any[] | null }) => {
  if (!sharedUsers?.length) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', ml: 1 }}>
      {sharedUsers.slice(0, 3).map((user, index) => (
        <AvatarWrapper
          key={user.id}
          alt={user.name}
          src={user.avatarUrl}
          size="xsmall"
          sx={{
            ml: index === 0 ? 0 : -0.75,
            border: `solid 2px ${tokens.colors.background.paper}`,
          }}
        />
      ))}
      {sharedUsers.length > 3 && (
        <Box
          sx={{
            ml: -0.75,
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: tokens.colors.background.neutral,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...tokens.typography.caption,
            fontSize: 10,
            border: `solid 2px ${tokens.colors.background.paper}`,
          }}
        >
          +{sharedUsers.length - 3}
        </Box>
      )}
    </Box>
  );
};

export const FileItemActions = ({
  id,
  checked,
  onChange,
  openMenu,
  onOpenMenu,
  sx,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  openMenu: boolean;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: any;
}) => (
  <Box
    sx={[
      {
        display: 'flex',
        alignItems: 'center',
        ml: 1,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      component="button"
      onClick={onChange}
      sx={{
        p: 0.5,
        display: 'flex',
        color: checked ? tokens.colors.error.main : tokens.colors.text.disabled,
        bgcolor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <Iconify icon={(checked ? 'solar:heart-bold' : 'solar:heart-linear') as any} width={18} />
    </Box>

    <Box
      component="button"
      onClick={onOpenMenu}
      sx={{
        p: 0.5,
        display: 'flex',
        color: tokens.colors.text.disabled,
        bgcolor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        ...(openMenu && { color: tokens.colors.text.primary }),
      }}
    >
      <Iconify icon="eva:more-vertical-fill" width={18} />
    </Box>
  </Box>
);

export const FileItemActionOverlay = styled('div')({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  position: 'absolute',
});
