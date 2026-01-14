import type { SxProps } from 'src/types/component-props';
import type { Props as SimplebarProps } from 'simplebar-react';

// ----------------------------------------------------------------------

export type ScrollbarProps = SimplebarProps &
  React.ComponentProps<'div'> & {
    sx?: SxProps;
    fillContent?: boolean;
    slotProps?: {
      wrapperSx?: SxProps;
      contentSx?: SxProps;
      contentWrapperSx?: SxProps;
    };
  };
