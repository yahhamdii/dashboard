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


// import { useCircuitComponent } from 'src/lib/feature-flags';

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

export interface TableWrapperProps extends React.TableHTMLAttributes<HTMLTableElement> {
  size?: 'small' | 'medium';
  padding?: 'normal' | 'checkbox' | 'none';
  stickyHeader?: boolean;
  sx?: any;
  [key: string]: any;
}

/**
 * Table wrapper component
 */
export function TableWrapper({
  children,
  className,
  sx,
  ...other
}: TableWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  // Utiliser un élément HTML natif avec styles Circuit UI
  const circuitStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques
  const { classes, component, padding, size, stickyHeader, ...tableProps } = other as any;

  return (
    <table className={className} style={circuitStyles} {...tableProps}>
      {children}
    </table>
  );
}

// ----------------------------------------------------------------------

export interface TableHeadWrapperProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sx?: any;
  [key: string]: any;
}

/**
 * TableHead wrapper component
 */
export function TableHeadWrapper({
  children,
  className,
  sx,
  ...other
}: TableHeadWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  const circuitStyles: React.CSSProperties = {
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques
  const { classes, component, ...theadProps } = other as any;

  return (
    <thead className={className} style={circuitStyles} {...theadProps}>
      {children}
    </thead>
  );
}

// ----------------------------------------------------------------------

export interface TableBodyWrapperProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sx?: any;
  [key: string]: any;
}

/**
 * TableBody wrapper component
 */
export function TableBodyWrapper({
  children,
  className,
  sx,
  ...other
}: TableBodyWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  const circuitStyles: React.CSSProperties = {
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques
  const { classes, component, ...tbodyProps } = other as any;

  return (
    <tbody className={className} style={circuitStyles} {...tbodyProps}>
      {children}
    </tbody>
  );
}

// ----------------------------------------------------------------------

export interface TableRowWrapperProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  hover?: boolean;
  sx?: any;
  [key: string]: any;
}

/**
 * TableRow wrapper component
 */
export function TableRowWrapper({
  children,
  className,
  sx,
  ...other
}: TableRowWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  const circuitStyles: React.CSSProperties = {
    borderBottom: '1px solid var(--cui-border-subtle)',
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques
  const { classes, component, hover, selected, ...trProps } = other as any;

  return (
    <tr className={className} style={circuitStyles} {...trProps}>
      {children}
    </tr>
  );
}

// ----------------------------------------------------------------------

export interface TableCellWrapperProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  padding?: 'normal' | 'checkbox' | 'none';
  variant?: 'head' | 'body' | 'footer';
  sx?: any;
  component?: React.ElementType; // Sometimes used for 'th'
  scope?: string;
  [key: string]: any;
}

/**
 * TableCell wrapper component
 */
export function TableCellWrapper({
  children,
  className,
  sx,
  align,
  padding,
  component,
  ...other
}: TableCellWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

  const circuitStyles: React.CSSProperties = {
    padding: padding === 'none' ? 0 : padding === 'checkbox' ? '4px' : 'var(--cui-spacings-kilo)',
    textAlign: align || 'left',
    ...filterValidStyles(sx),
  };

  // Filtrer les props MUI spécifiques
  // component can be used to set 'th' or 'td'
  const {
    classes,
    scope,
    sortDirection, // MUI specific
    variant,
    ...tdProps
  } = other as any;

  const Component = (component as React.ElementType) || 'td';
  // If variant="head", default to th if not specified
  const FinalComponent = component ? Component : (other.variant === 'head' ? 'th' : 'td');

  return (
    <FinalComponent className={className} style={circuitStyles} {...tdProps}>
      {children}
    </FinalComponent>
  );
}

// ----------------------------------------------------------------------

export interface TableContainerWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any;
  component?: React.ElementType;
  [key: string]: any;
}

/**
 * TableContainer wrapper component
 */
export function TableContainerWrapper({
  children,
  className,
  sx,
  ...other
}: TableContainerWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_TABLES');

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

