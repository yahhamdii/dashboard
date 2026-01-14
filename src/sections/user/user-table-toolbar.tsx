import type { SelectProps } from 'src/types/component-props';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { IUserTableFilters } from 'src/types/user';

import { useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import {
  BoxWrapper as Box,
  MenuListWrapper as MenuList,
  MenuItemWrapper as MenuItem,
  FormControlWrapper as FormControl,
  InputLabelWrapper as InputLabel,
  InputAdornmentWrapper as InputAdornment,
  InputWrapper as TextField,
  SelectWrapper as Select,
  CheckboxWrapper as Checkbox,
  IconButtonWrapper
} from 'src/components/circuit-ui';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  onResetPage: () => void;
  filters: UseSetStateReturn<IUserTableFilters>;
  options: {
    roles: string[];
  };
};

export function UserTableToolbar({ filters, options, onResetPage }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterRole = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: string[] | string; name: string } })) => {
      const value = 'target' in event ? event.target.value : (event as any).target.value;
      const newValue =
        typeof value === 'string' ? value.split(',') : (Array.isArray(value) ? value : []);

      onResetPage();
      updateFilters({ role: newValue });
    },
    [onResetPage, updateFilters]
  ) as SelectProps<string[]>['onChange'];

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const useCircuit = useCircuitLayoutsWithPathname();

  return (
    <>
      {useCircuit ? (
        <div className="flex flex-col md:flex-row gap-2 p-10 pr-2.5 md:pr-1 items-end md:items-center">
          <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
            <InputLabel htmlFor="filter-role-select">Role</InputLabel>
            <Select
              multiple
              label="Role"
              value={currentFilters.role}
              onChange={handleFilterRole as any}
              renderValue={(selected) => (selected as string[]).map((value) => value).join(', ')}
              inputProps={{ id: 'filter-role-select' }}
              MenuProps={{
                slotProps: { paper: { sx: { maxHeight: 240 } } },
              }}
            >
              {options.roles.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    disableRipple
                    size="small"
                    checked={currentFilters.role.includes(option)}
                    slotProps={{ input: { id: `${option}-checkbox` } }}
                  />
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex gap-2 w-full flex-grow items-center">
            <TextField
              fullWidth
              value={currentFilters.name}
              onChange={handleFilterName}
              placeholder="Search..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <IconButtonWrapper onClick={menuActions.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButtonWrapper>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            p: 2.5,
            gap: 2,
            display: 'flex',
            pr: { xs: 2.5, md: 1 },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-end', md: 'center' },
          }}
        >
          <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
            <InputLabel htmlFor="filter-role-select">Role</InputLabel>
            <Select
              multiple
              label="Role"
              value={currentFilters.role}
              onChange={handleFilterRole as any}
              renderValue={(selected) => (selected as string[]).map((value) => value).join(', ')}
              inputProps={{ id: 'filter-role-select' }}
              MenuProps={{
                slotProps: { paper: { sx: { maxHeight: 240 } } },
              }}
            >
              {options.roles.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox
                    disableRipple
                    size="small"
                    checked={currentFilters.role.includes(option)}
                    slotProps={{ input: { id: `${option}-checkbox` } }}
                  />
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              gap: 2,
              width: 1,
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              value={currentFilters.name}
              onChange={handleFilterName}
              placeholder="Search..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <IconButtonWrapper onClick={menuActions.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButtonWrapper>
          </Box>
        </Box>
      )}

      {renderMenuActions()}
    </>
  );
}
