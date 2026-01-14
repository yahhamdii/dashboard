import { TableRowWrapper as TableRow, TableCellWrapper as TableCell } from 'src/components/circuit-ui';

// ----------------------------------------------------------------------

export type TableEmptyRowsProps = {
  height?: number;
  emptyRows: number;
  sx?: any;
};

export function TableEmptyRows({ emptyRows, height, sx, ...other }: TableEmptyRowsProps) {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={[
        {
          ...(height && { height: height * emptyRows }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
