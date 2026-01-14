// import type { PaperProps } from '@mui/material/Paper';
// import type { PopoverProps } from '@mui/material/Popover';
// import type { Theme, SxProps } from '@mui/material/styles';

type PaperProps = React.ComponentProps<'div'>;
type PopoverProps = React.ComponentProps<'div'>;
type Theme = any;
type SxProps<T = Theme> = any;

// ----------------------------------------------------------------------

export type ArrowPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export type ArrowProps = {
  hide?: boolean;
  size?: number;
  sx?: SxProps<Theme>;
  placement?: ArrowPlacement;
};

export type PaperOffset = [number, number];

export type CustomPopoverProps = PopoverProps & {
  open?: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  slotProps?: any & {
    arrow?: ArrowProps;
    paper?: PaperProps & {
      offset?: PaperOffset;
    };
  };
};
