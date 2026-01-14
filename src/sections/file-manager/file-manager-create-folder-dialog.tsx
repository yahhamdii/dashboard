import type { DialogProps } from '@mui/material/Dialog';

import { useState, useEffect, useCallback } from 'react';

import {
  BoxWrapper as Box,
  IconButtonWrapper as IconButton,
  InputWrapper as TextField,
  ButtonWrapper as Button,
  DialogWrapper as Dialog,
  DialogTitleWrapper as DialogTitle,
  DialogActionsWrapper as DialogActions,
  DialogContentWrapper as DialogContent,
} from 'src/components/circuit-ui';
import { tokens } from 'src/theme/design-tokens';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  title?: string;
  folderName?: string;
  onClose: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileManagerCreateFolderDialog({
  open,
  onClose,
  onCreate,
  onUpdate,
  folderName,
  onChangeFolderName,
  title = 'Add files',
  ...other
}: Props) {
  const [files, setFiles] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleUpload = () => {
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} aria-hidden={!open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{
          p:
            tokens.spacing(3) +
            ' ' +
            tokens.spacing(3) +
            ' ' +
            tokens.spacing(2) +
            ' ' +
            tokens.spacing(3),
        }}
      >
        {title}
      </DialogTitle>

      <IconButton
        aria-label="Close"
        onClick={onClose}
        sx={{ top: 8, right: 8, position: 'absolute' }}
      >
        <Iconify icon="mingcute:close-line" />
      </IconButton>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label="Folder name"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload multiple value={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleUpload}
        >
          Upload
        </Button>

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )}

        {(onCreate || onUpdate) && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
}
