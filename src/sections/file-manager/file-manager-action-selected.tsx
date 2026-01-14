import type { BoxProps } from '@mui/material/Box';

import {
  BoxWrapper as Box,
  PortalWrapper as Portal,
  CheckboxWrapper as Checkbox,
} from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';
import { tokens } from 'src/theme/design-tokens';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  rowCount: number;
  numSelected: number;
  selected?: string[];
  action?: React.ReactNode;
  onSelectAllItems: (checked: boolean) => void;
};

export function FileManagerActionSelected({
  sx,
  action,
  selected,
  rowCount,
  numSelected,
  onSelectAllItems,
  ...other
}: Props) {
  return (
    <Portal>
      <Box
        sx={[
          {
            right: 0,
            zIndex: 9,
            bottom: 0,
            display: 'flex',
            borderRadius: 1.5,
            position: 'fixed',
            alignItems: 'center',
            bgcolor: tokens.colors.common.black,
            p:
              tokens.spacing(1.5) +
              ' ' +
              tokens.spacing(2) +
              ' ' +
              tokens.spacing(1.5) +
              ' ' +
              tokens.spacing(1),
            boxShadow: tokens.customShadows.z20,
            m: { xs: 2, md: 3 },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Checkbox
          indeterminate={!!numSelected && numSelected < rowCount}
          checked={!!rowCount && numSelected === rowCount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onSelectAllItems(event.target.checked)
          }
          icon={<Iconify icon="eva:radio-button-off-fill" width={22} />}
          checkedIcon={<Iconify icon="solar:check-circle-bold" width={22} />}
          indeterminateIcon={<Iconify icon="eva:minus-circle-fill" width={22} />}
          slotProps={{
            input: { id: 'items-selected-checkbox' },
          }}
        />

        {selected && (
          <Box
            component="span"
            sx={{
              mr: 2,
              minWidth: 128,
              color: tokens.colors.common.white,
              typography: 'subtitle2',
            }}
          >
            {selected.length} items selected
          </Box>
        )}

        {action && action}
      </Box>
    </Portal>
  );
}
