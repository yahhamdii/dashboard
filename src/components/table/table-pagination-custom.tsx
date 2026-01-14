import { tokens } from 'src/theme/design-tokens';
import { BoxWrapper as Box, TypographyWrapper as Typography, SwitchWrapper as Switch, IconButtonWrapper as IconButton, StackWrapper as Stack } from 'src/components/circuit-ui';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type TablePaginationCustomProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
  dense?: boolean;
  sx?: any;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TablePaginationCustom({
  sx,
  dense,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onChangeDense,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25],
}: TablePaginationCustomProps) {
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);

  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          p: tokens.spacing(1, 2),
          borderTop: `solid 1px ${tokens.colors.divider}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {onChangeDense && (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Switch
            checked={dense}
            onChange={onChangeDense}
            slotProps={{ input: { id: 'dense-switch' } }}
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Dense
          </Typography>
        </Box>
      )}

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Rows per page:
        </Typography>

        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange?.(e as any)}
          style={{
            border: 'none',
            background: 'none',
            outline: 'none',
            cursor: 'pointer',
            padding: tokens.spacing(0.5),
            fontSize: tokens.typography.body2.fontSize,
            color: 'inherit',
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <Typography variant="body2" sx={{ color: 'text.secondary', mx: 2 }}>
          {from}-{to} of {count}
        </Typography>

        <IconButton
          size="small"
          disabled={page === 0}
          onClick={(e) => onPageChange(e, page - 1)}
        >
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <IconButton
          size="small"
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={(e) => onPageChange(e, page + 1)}
        >
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      </Stack>
    </Box>
  );
}
