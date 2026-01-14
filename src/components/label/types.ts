import type { LabelRoot } from './styles';

export type LabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'black'
  | 'white';

export type LabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';

export interface LabelProps extends React.ComponentProps<typeof LabelRoot> {
  disabled?: boolean;
  color?: LabelColor;
  variant?: LabelVariant;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  sx?: React.CSSProperties;
}
