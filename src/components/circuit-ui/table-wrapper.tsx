/**
 * Table Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser des composants Table compatibles Circuit UI avec l'API MUI Table
 * pour faciliter la migration progressive.
 * 
 * Note: Circuit UI n'a pas de composant Table direct, donc on utilise des éléments HTML natifs
 * avec des styles basés sur les design tokens de Circuit UI.
 */

'use client';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import type { TableProps as MuiTableProps } from '@mui/material/Table';
import type { TableHeadProps as MuiTableHeadProps } from '@mui/material/TableHead';
import type { TableBodyProps as MuiTableBodyProps } from '@mui/material/TableBody';
import type { TableRowProps as MuiTableRowProps } from '@mui/material/TableRow';
import type { TableCellProps as MuiTableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps as MuiTableContainerProps } from '@mui/material/TableContainer';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

/**
 * Filtre les styles valides de sx (exclut les sélecteurs MUI comme &.Mui-selected, &:hover)
 */
function filterValidStyles(sx: any): React.CSSProperties {
  const validStyles: React.CSSProperties = {};
  if (sx && typeof sx === 'object' && !Array.isArray(sx)) {
    Object.keys(sx).forEach((key) => {
      // Ne garder que les propriétés CSS valides (pas de sélecteurs commençant par & ou .)
      if (!key.startsWith('&') && !key.startsWith('.')) {
        validStyles[key as keyof React.CSSProperties] = sx[key];
      }
    });
  }
  return validStyles;
}

// ----------------------------------------------------------------------

type TableWrapperProps = MuiTableProps;

/**
 * Table wrapper component
 */
export function TableWrapper({
  children,
  className,
  sx,
  ...other
}: TableWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  if (!useCircuit) {
    return (
      <Table className={className} sx={sx} {...other}>
        {children}
      </Table>
    );
  }

  // Utiliser un élément HTML natif avec styles Circuit UI
  const circuitStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    ...filterValidStyles(sx),
  };

  return (
    <table className={className} style={circuitStyles} {...other}>
      {children}
    </table>
  );
}

// ----------------------------------------------------------------------

type TableHeadWrapperProps = MuiTableHeadProps;

/**
 * TableHead wrapper component
 */
export function TableHeadWrapper({
  children,
  className,
  sx,
  ...other
}: TableHeadWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  if (!useCircuit) {
    return (
      <TableHead className={className} sx={sx} {...other}>
        {children}
      </TableHead>
    );
  }

  const circuitStyles: React.CSSProperties = {
    ...filterValidStyles(sx),
  };

  return (
    <thead className={className} style={circuitStyles} {...other}>
      {children}
    </thead>
  );
}

// ----------------------------------------------------------------------

type TableBodyWrapperProps = MuiTableBodyProps;

/**
 * TableBody wrapper component
 */
export function TableBodyWrapper({
  children,
  className,
  sx,
  ...other
}: TableBodyWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  if (!useCircuit) {
    return (
      <TableBody className={className} sx={sx} {...other}>
        {children}
      </TableBody>
    );
  }

  const circuitStyles: React.CSSProperties = {
    ...filterValidStyles(sx),
  };

  return (
    <tbody className={className} style={circuitStyles} {...other}>
      {children}
    </tbody>
  );
}

// ----------------------------------------------------------------------

type TableRowWrapperProps = MuiTableRowProps;

/**
 * TableRow wrapper component
 */
export function TableRowWrapper({
  children,
  className,
  sx,
  ...other
}: TableRowWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  if (!useCircuit) {
    return (
      <TableRow className={className} sx={sx} {...other}>
        {children}
      </TableRow>
    );
  }

  const circuitStyles: React.CSSProperties = {
    borderBottom: '1px solid var(--cui-border-subtle)',
    ...filterValidStyles(sx),
  };

  return (
    <tr className={className} style={circuitStyles} {...other}>
      {children}
    </tr>
  );
}

// ----------------------------------------------------------------------

type TableCellWrapperProps = MuiTableCellProps;

/**
 * TableCell wrapper component
 */
export function TableCellWrapper({
  children,
  className,
  sx,
  align,
  padding,
  ...other
}: TableCellWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  if (!useCircuit) {
    return (
      <TableCell className={className} sx={sx} align={align} padding={padding} {...other}>
        {children}
      </TableCell>
    );
  }

  const circuitStyles: React.CSSProperties = {
    padding: padding === 'none' ? 0 : padding === 'checkbox' ? '4px' : 'var(--cui-spacings-kilo)',
    textAlign: align || 'left',
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    component,
    scope,
    ...tdProps
  } = other as any;

  return (
    <td className={className} style={circuitStyles} {...(tdProps as React.TdHTMLAttributes<HTMLTableDataCellElement>)}>
      {children}
    </td>
  );
}

// ----------------------------------------------------------------------

type TableContainerWrapperProps = MuiTableContainerProps;

/**
 * TableContainer wrapper component
 */
export function TableContainerWrapper({
  children,
  className,
  sx,
  ...other
}: TableContainerWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  if (!useCircuit) {
    return (
      <TableContainer className={className} sx={sx} {...other}>
        {children}
      </TableContainer>
    );
  }

  const circuitStyles: React.CSSProperties = {
    width: '100%',
    overflowX: 'auto',
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques qui ne sont pas compatibles avec un div
  const {
    classes,
    component,
    ...divProps
  } = other as any;

  return (
    <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

