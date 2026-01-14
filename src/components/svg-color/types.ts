import type { SxProps } from 'src/types/component-props';

// ----------------------------------------------------------------------

export type SvgColorProps = React.ComponentProps<'span'> & {
  src: string;
  sx?: SxProps;
};
