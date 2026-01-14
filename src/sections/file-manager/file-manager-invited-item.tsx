import type { IFileShared } from 'src/types/file';

import { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { ButtonWrapper as Button, AvatarWrapper, TooltipWrapper } from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  person: IFileShared;
};

export function FileManagerInvitedItem({ person }: Props) {
  const menuActions = usePopover();

  const [permission, setPermission] = useState(person.permission);

  const handleChangePermission = useCallback((newPermission: string) => {
    setPermission(newPermission);
  }, []);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
    >
      <MenuList>
        <MenuItem
          selected={permission === 'view'}
          onClick={() => {
            menuActions.onClose();
            handleChangePermission('view');
          }}
        >
          <Iconify icon="solar:eye-bold" />
          Can view
        </MenuItem>

        <MenuItem
          selected={permission === 'edit'}
          onClick={() => {
            menuActions.onClose();
            handleChangePermission('edit');
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Can edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => menuActions.onClose()} sx={{ color: tokens.colors.error.main }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Remove
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <li className="flex items-center py-1">
        <AvatarWrapper alt={person.name} src={person.avatarUrl} size="medium" sx={{ mr: 2 }} />

        <ListItemText
          primary={person.name}
          secondary={
            <TooltipWrapper title={person.email}>
              <span>{person.email}</span>
            </TooltipWrapper>
          }
          sx={{ flexGrow: 1, pr: 1 }}
          slotProps={{
            primary: { noWrap: true },
            secondary: { noWrap: true },
          }}
        />

        <Button
          size="small"
          color="inherit"
          endIcon={
            <Iconify
              width={16}
              icon={menuActions.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              sx={{ ml: -0.5 }}
            />
          }
          onClick={menuActions.onOpen}
          sx={{
            flexShrink: 0,
            fontSize: '12px',
            ...(menuActions.open && { bgcolor: tokens.colors.action.selected }),
          }}
        >
          Can {permission}
        </Button>
      </li>

      {renderMenuActions()}
    </>
  );
}
