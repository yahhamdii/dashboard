import type { CSSObject } from '@emotion/styled';

import { tokens } from 'src/theme/design-tokens';
import { BoxWrapper as Box, TableHeadWrapper as TableHead, TableRowWrapper as TableRow, TableCellWrapper as TableCell, CheckboxWrapper as Checkbox } from 'src/components/circuit-ui';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const visuallyHidden: React.CSSProperties = {
  border: 0,
  padding: 0,
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

export type TableHeadCellProps = {
  id: string;
  label?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sx?: any;
};

export type TableHeadCustomProps = {
  orderBy?: string;
  rowCount?: number;
  sx?: any;
  numSelected?: number;
  order?: 'asc' | 'desc';
  headCells: TableHeadCellProps[];
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
};

export function TableHeadCustom({
  sx,
  order,
  onSort,
  orderBy,
  headCells,
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
}: TableHeadCustomProps) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={!!numSelected && numSelected < rowCount}
              checked={!!rowCount && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllRows(event.target.checked)
              }
              slotProps={{
                input: {
                  id: `all-row-checkbox`,
                  'aria-label': `All row Checkbox`,
                },
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={[
              {
                width: headCell.width,
                ...(onSort && { cursor: 'pointer', userSelect: 'none' })
              },
              ...(Array.isArray(headCell.sx) ? headCell.sx : [headCell.sx]),
            ]}
            onClick={() => onSort?.(headCell.id)}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              {headCell.label}

              {onSort && (
                <Box
                  sx={{
                    ml: 0.5,
                    display: 'inline-flex',
                    flexDirection: 'column',
                    ...(orderBy !== headCell.id && { opacity: 0.48 }),
                  }}
                >
                  <Iconify
                    icon={
                      orderBy === headCell.id && order === 'desc'
                        ? 'eva:arrow-ios-downward-fill'
                        : 'eva:arrow-ios-upward-fill'
                    }
                    sx={{ width: 16, height: 16 }}
                  />
                </Box>
              )}

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
