'use client';

// import Portal from '@mui/material/Portal';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';

import { Iconify } from '../iconify';
// import { SnackbarRoot } from './styles'; // Removed
import './snackbar.css'; // Import CSS

// ----------------------------------------------------------------------

export function Snackbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Toaster
      expand
      closeButton
      gap={12}
      offset={16}
      visibleToasts={4}
      position="top-right"
      className="snackbar-root"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'snackbar-toast',
          icon: 'snackbar-icon',
          loader: 'snackbar-loader',
          loading: 'snackbar-loader-visible',
          content: 'snackbar-content',
          title: 'snackbar-title',
          description: 'snackbar-description',
          closeButton: 'snackbar-close-button',
          actionButton: 'snackbar-action-button',
          cancelButton: 'snackbar-cancel-button',
          info: 'snackbar-info',
          error: 'snackbar-error',
          success: 'snackbar-success',
          warning: 'snackbar-warning',
        },
      }}
      icons={{
        // loading: <span className="snackbar-loader-icon" />,
        info: <Iconify className="icon-svg" icon="solar:info-circle-bold" width={24} />,
        success: <Iconify className="icon-svg" icon="solar:check-circle-bold" width={24} />,
        warning: <Iconify className="icon-svg" icon="solar:danger-triangle-bold" width={24} />,
        error: <Iconify className="icon-svg" icon="solar:danger-bold" width={24} />,
      }}
    />,
    document.body
  );
}
