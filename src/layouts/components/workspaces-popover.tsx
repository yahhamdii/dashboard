'use client';

import React, { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import {
  TypographyWrapper as Typography,
  ButtonWrapper as Button,
  BoxWrapper as Box,
  AvatarWrapper as Avatar,
  DividerWrapper as Divider,
  MenuListWrapper as MenuList,
  MenuItemWrapper as MenuItem,
  ButtonBaseWrapper as ButtonBase,
} from 'src/components/circuit-ui';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = React.ComponentProps<typeof ButtonBase> & {
  data?: {
    id: string;
    name: string;
    logo: string;
    plan: string;
  }[];
  sx?: any;
};

export function WorkspacesPopover({ data = [], sx, ...other }: WorkspacesPopoverProps) {
  const mediaQuery = 'sm';

  const { open, anchorEl, onClose, onOpen } = usePopover();

  const [workspace, setWorkspace] = useState(data[0]);

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[0]) => {
      setWorkspace(newValue);
      onClose();
    },
    [onClose]
  );

  const buttonBg: React.CSSProperties = {
    height: '100%',
    zIndex: -1,
    opacity: open ? 1 : 0,
    borderRadius: '4px',
    position: 'absolute',
    visibility: open ? 'visible' : 'hidden',
    backgroundColor: 'var(--cui-bg-subtle)',
    width: 'calc(100% + 8px)',
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), visibility 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const renderButton = () => {
    const mergedSx = Array.isArray(sx) ? sx : [sx];
    const sxStyles = mergedSx.reduce((acc, style) => {
      if (style && typeof style === 'object') {
        return { ...acc, ...style };
      }
      return acc;
    }, {});

    const buttonStyles: React.CSSProperties = {
      paddingTop: '4px',
      paddingBottom: '4px',
      gap: '4px',
      position: 'relative',
      ...sxStyles,
    };

    return (
      <ButtonBase
        onClick={onOpen}
        style={buttonStyles}
        className="lg:pl-[var(--layout-nav-vertical-width)]"
        {...other}
      >
        <div style={buttonBg} />
        <img
          alt={workspace?.name}
          src={workspace?.logo}
          style={{ width: 24, height: 24, borderRadius: '50%' }}
        />

        <span
          className="hidden sm:inline-flex"
          style={{ fontSize: '0.875rem', fontWeight: 600 }}
        >
          {workspace?.name}
        </span>

        <Label
          color={workspace?.plan === 'Free' ? 'default' : 'info'}
          className="hidden sm:inline-flex"
          style={{
            height: 22,
            cursor: 'inherit',
          }}
        >
          {workspace?.plan}
        </Label>

        <Iconify width={16} icon="carbon:chevron-sort" style={{ color: 'var(--cui-fg-subtle)' }} />
      </ButtonBase>
    );
  };

  const renderMenuList = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{
        arrow: { placement: 'top-left' },
        paper: { sx: { marginTop: '4px', marginLeft: '-24.8px', width: 240 } },
      }}
    >
      <Scrollbar sx={{ maxHeight: 240 }}>
        <MenuList>
          {data.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === workspace?.id}
              onClick={() => handleChangeWorkspace(option)}
              sx={{ height: 48 }}
            >
              <Avatar alt={option.name} src={option.logo} sx={{ width: 24, height: 24 }} />

              <Typography
                noWrap
                component="span"
                variant="body2"
                sx={{ flexGrow: 1, fontWeight: 500 }}
              >
                {option.name}
              </Typography>

              <Label color={option.plan === 'Free' ? 'default' : 'info'}>{option.plan}</Label>
            </MenuItem>
          ))}
        </MenuList>
      </Scrollbar>

      <Divider sx={{ marginTop: '4px', marginBottom: '4px', borderStyle: 'dashed' }} />

      <Button
        fullWidth
        startIcon={<Iconify width={18} icon="mingcute:add-line" />}
        onClick={() => {
          onClose();
        }}
        sx={{
          gap: '16px',
          justifyContent: 'flex-start',
          fontWeight: 500,
        }}
      >
        Create workspace
      </Button>
    </CustomPopover>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}
