'use client';



import { ButtonWrapper as Button } from 'src/components/circuit-ui';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

// export const chipProps: ChipProps = { size: 'small', variant: 'filled' };
export const chipProps = { size: 'small', variant: 'filled' };

export type FiltersResultProps = React.ComponentProps<'div'> & {
  totalResults: number;
  onReset?: () => void;
  sx?: any;
};

export function FiltersResult({
  sx,
  onReset,
  children,
  totalResults,
  className,
  ...other
}: FiltersResultProps) {

  const rootStyle: React.CSSProperties = {
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {})
  };

  const labelStyle: React.CSSProperties = {
    // ...theme.typography.body2
    fontFamily: 'var(--cui-font-stack-default)',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    marginBottom: '12px', // theme.spacing(1.5)
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px', // theme.spacing(1)
  };

  return (
    <div className={className} style={rootStyle} {...other}>
      <div style={labelStyle}>
        <strong>{totalResults}</strong>
        <span style={{ color: 'var(--cui-fg-subtle)' }}> results found</span>
      </div>

      <div style={contentStyle}>
        {children}

        <Button
          color="error" // Ensure ButtonWrapper handles this or maps it
          onClick={onReset}
          // @ts-ignore
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

// const ResultRoot = styled('div')``;

// const ResultLabel = styled('div')(({ theme }) => ({
//   ...theme.typography.body2,
//   marginBottom: theme.spacing(1.5),
//   '& span': { color: theme.vars.palette.text.secondary },
// }));

// const ResultContent = styled('div')(({ theme }) => ({
//   flexGrow: 1,
//   display: 'flex',
//   flexWrap: 'wrap',
//   alignItems: 'center',
//   gap: theme.spacing(1),
// }));
