'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import { TableRowWrapper as TableRow, TableCellWrapper as TableCell } from 'src/components/circuit-ui';

import { EmptyContent } from '../empty-content';

// ----------------------------------------------------------------------

export type TableNoDataProps = {
  notFound: boolean;
  sx?: any;
};

export function TableNoData({ notFound, sx }: TableNoDataProps) {
  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <EmptyContent filled sx={[{ py: 10 }, ...(Array.isArray(sx) ? sx : [sx])]} />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
