import type { ConfirmDialogProps } from './types';

import {
  ButtonWrapper as Button,
  DialogWrapper as Dialog,
  DialogTitleWrapper as DialogTitle,
  DialogActionsWrapper as DialogActions,
  DialogContentWrapper as DialogContent,
} from 'src/components/circuit-ui';

// ----------------------------------------------------------------------

export function ConfirmDialog({
  open,
  title,
  action,
  content,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={!!open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content}</DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
