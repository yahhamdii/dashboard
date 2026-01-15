import type { IFileManager } from 'src/types/file';

import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useBoolean, usePopover, useDoubleClick, useCopyToClipboard } from 'minimal-shared/hooks';

import {
  BoxWrapper as Box,
  DividerWrapper as Divider,
  MenuListWrapper as MenuList,
  MenuItemWrapper as MenuItem,
  ListItemTextWrapper as ListItemText,
  IconButtonWrapper as IconButton,
  TableRowWrapper as TableRow,
  TableCellWrapper as TableCell,
  CheckboxWrapper as Checkbox,
  TypographyWrapper as Typography,
  ButtonWrapper as Button,
  StackWrapper as Stack
} from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';
import { tokens } from 'src/theme/design-tokens';

import { fData } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { CustomPopover } from 'src/components/custom-popover';

import { FileManagerShareDialog } from './file-manager-share-dialog';
import { FileManagerFileDetails } from './file-manager-file-details';
import { FileItemAvatar, FileItemActions } from './file-manager-file-item-slots';

// ----------------------------------------------------------------------

type Props = {
  row: IFileManager;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function FileManagerTableRow({ row, selected, onSelectRow, onDeleteRow }: Props) {
  const { copy } = useCopyToClipboard();

  const [inviteEmail, setInviteEmail] = useState('');

  const shareDialog = useBoolean();
  const detailsDrawer = useBoolean();
  const confirmDialog = useBoolean();
  const menuActions = usePopover();
  const favorite = useBoolean(row.isFavorited);

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleClick = useDoubleClick({
    click: () => {
      detailsDrawer.onTrue();
    },
    doubleClick: () => console.info('DOUBLE CLICK'),
  });

  const handleCopy = useCallback(() => {
    toast.success('Copied!');
    copy(row.url);
  }, [copy, row.url]);

  const defaultStyles: any = {
    borderTop: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.16)}`,
    borderBottom: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderLeft: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderRight: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.16)}`,
    },
  };

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy link
        </MenuItem>

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            shareDialog.onTrue();
          }}
        >
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: tokens.colors.error.main }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderFileDetailsDrawer = () => (
    <FileManagerFileDetails
      file={row}
      favorited={favorite.value}
      onFavorite={favorite.onToggle}
      onCopyLink={handleCopy}
      open={detailsDrawer.value}
      onClose={detailsDrawer.onFalse}
      onDelete={onDeleteRow}
    />
  );

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      shared={row.shared}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onCopyLink={handleCopy}
      onClose={() => {
        shareDialog.onFalse();
        setInviteEmail('');
      }}
    />
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <TableRow
        selected={selected}
        sx={{
          borderRadius: 2,
          [`&.Mui-selected, &:hover`]: {
            backgroundColor: tokens.colors.background.paper,
            boxShadow: tokens.customShadows.z20,
            transition: `background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
            '&:hover': {
              backgroundColor: tokens.colors.background.paper,
              boxShadow: tokens.customShadows.z20,
            },
          },
          [`& .MuiTableCell-root`]: {
            ...defaultStyles,
          },
          ...(detailsDrawer.value && {
            [`& .MuiTableCell-root`]: {
              ...defaultStyles,
            },
          }),
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            onDoubleClick={() => console.info('ON DOUBLE CLICK')}
            slotProps={{
              input: {
                id: `${row.id}-checkbox`,
                'aria-label': `${row.id} checkbox`,
              },
            }}
          />
        </TableCell>

        <TableCell onClick={handleClick}>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <FileThumbnail file={row.type} />

            <Typography
              noWrap
              variant="inherit"
              sx={{
                maxWidth: 360,
                cursor: 'pointer',
                ...(detailsDrawer.value && { fontWeight: 'fontWeightBold' }),
              }}
            >
              {row.name}
            </Typography>
          </Box>
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          {fData(row.size)}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          {row.type}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          <ListItemText
            primary={fDate(row.modifiedAt)}
            secondary={fTime(row.modifiedAt)}
            slotProps={{
              primary: { sx: { typography: 'body2' } },
              secondary: {
                sx: { mt: 0.5, typography: 'caption' },
              },
            }}
          />
        </TableCell>

        <TableCell align="right" onClick={handleClick}>
          <FileItemAvatar sharedUsers={row.shared} />
        </TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
          <FileItemActions
            id={row.id}
            checked={favorite.value}
            onChange={favorite.onToggle}
            openMenu={menuActions.open}
            onOpenMenu={menuActions.onOpen}
            sx={{ position: 'static' }}
          />
        </TableCell>
      </TableRow >

      {renderFileDetailsDrawer()}
      {renderShareDialog()}

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
