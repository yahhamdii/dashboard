
type DialogProps = React.ComponentProps<'div'>;

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  open?: boolean;
  onClose: () => void;
  title: React.ReactNode;
  action: React.ReactNode;
  content?: React.ReactNode;
};
