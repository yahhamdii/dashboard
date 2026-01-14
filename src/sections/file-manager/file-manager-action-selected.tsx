import type { BoxProps } from '@mui/material/Box';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import Portal from '@mui/material/Portal';

import { CheckboxWrapper as Checkbox } from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

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
  const useCircuit = useCircuitLayoutsWithPathname();
  
  // Filtrer les props MUI spécifiques
  const {
    sx: _sx,
    ...divProps
  } = other as any;
  
  return (
    <Portal>
      {useCircuit ? (
        <div
          className="fixed bottom-0 right-0 z-[9] flex items-center rounded-xl bg-black p-1.5 pr-2 pl-1.5 m-2 md:m-3 shadow-lg"
          {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
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
          <span className="mr-2 min-w-[128px] text-white text-sm dark:text-gray-800">
            {selected.length} items selected
          </span>
        )}

        {action && action}
      </div>
      ) : (
        <Box
          sx={[
            (theme) => ({
              right: 0,
              zIndex: 9,
              bottom: 0,
              display: 'flex',
              borderRadius: 1.5,
              position: 'fixed',
              alignItems: 'center',
              bgcolor: 'text.primary',
              p: theme.spacing(1.5, 2, 1.5, 1),
              boxShadow: theme.vars.customShadows.z20,
              m: { xs: 2, md: 3 },
            }),
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
              sx={[
                (theme) => ({
                  mr: 2,
                  minWidth: 128,
                  color: 'common.white',
                  typography: 'subtitle2',
                  ...theme.applyStyles('dark', {
                    color: 'grey.800',
                  }),
                }),
              ]}
            >
              {selected.length} items selected
            </Box>
          )}

          {action && action}
        </Box>
      )}
    </Portal>
  );
}
