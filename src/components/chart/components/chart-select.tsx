'use client';

import React from 'react';
import type { CustomPopoverProps } from '../../custom-popover';

import { varAlpha } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import {
  ButtonBaseWrapper as ButtonBase,
  MenuListWrapper as MenuList,
  MenuItemWrapper as MenuItem,
} from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { Iconify } from '../../iconify';
import { CustomPopover } from '../../custom-popover';

// ----------------------------------------------------------------------

type ChartSelectProps = Omit<React.ComponentProps<typeof ButtonBase>, 'onChange'> & {
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  slotProps?: {
    button?: React.ComponentProps<typeof ButtonBase> & { sx?: any };
    popover?: CustomPopoverProps;
  };
  sx?: any;
};

export function ChartSelect({ options, value, onChange, slotProps, sx, style, ...other }: ChartSelectProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const renderMenuActions = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose} {...slotProps?.popover}>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === value}
            onClick={() => {
              onClose();
              onChange(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  const buttonMergedSx = Array.isArray(slotProps?.button?.sx) ? slotProps.button.sx : [slotProps?.button?.sx];
  const buttonSxStyles = buttonMergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const mergedSx = Array.isArray(sx) ? sx : [sx];
  const sxStyles = mergedSx.reduce((acc, style) => {
    if (style && typeof style === 'object') {
      return { ...acc, ...style };
    }
    return acc;
  }, {});

  const buttonStyles: React.CSSProperties = {
    paddingRight: '8px',
    paddingLeft: '12px',
    gap: '12px',
    height: 34,
    borderRadius: '4px',
    fontSize: tokens.typography.pxToRem(14),
    fontWeight: 600,
    border: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.24)}`,
    display: 'flex',
    alignItems: 'center',
    ...buttonSxStyles,
    ...sxStyles,
    ...(style || {}),
  };

  return (
    <>
      <ButtonBase
        onClick={onOpen}
        style={buttonStyles}
        {...slotProps?.button}
        {...other}
      >
        {value}

        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
        />
      </ButtonBase>

      {renderMenuActions()}
    </>
  );
}
