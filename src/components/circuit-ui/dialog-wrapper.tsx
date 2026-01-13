/**
 * Dialog Wrapper - Compatibilité MUI → Circuit UI
 * 
 * Wrapper qui permet d'utiliser des composants Dialog compatibles Circuit UI avec l'API MUI Dialog
 * pour faciliter la migration progressive.
 * 
 * Note: Circuit UI n'a pas de composant Dialog direct, donc on utilise des éléments HTML natifs
 * avec des styles basés sur les design tokens de Circuit UI.
 */

'use client';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
import type { DialogContentProps as MuiDialogContentProps } from '@mui/material/DialogContent';
import type { DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';

import { useCircuitComponent } from 'src/lib/feature-flags';
import React from 'react';

// ----------------------------------------------------------------------

type DialogWrapperProps = MuiDialogProps;

/**
 * Dialog wrapper component
 */
export function DialogWrapper({
  open,
  onClose,
  children,
  className,
  sx,
  fullWidth,
  maxWidth,
  ...other
}: DialogWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  if (!useCircuit) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        className={className}
        sx={sx}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        {...other}
      >
        {children}
      </Dialog>
    );
  }

  // Utiliser un overlay avec modal pour Circuit UI
  if (!open) {
    return null;
  }

  const maxWidthMap: Record<string, string> = {
    xs: '400px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  };

  const maxWidthValue = maxWidth ? (typeof maxWidth === 'string' ? maxWidthMap[maxWidth] || '600px' : '600px') : '600px';

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1300,
  };

  const dialogStyles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'var(--cui-bg-normal)',
    borderRadius: 'var(--cui-border-radius-mega)',
    boxShadow: 'var(--cui-shadow-mega)',
    maxWidth: fullWidth ? '90vw' : maxWidthValue,
    width: fullWidth ? '90vw' : 'auto',
    maxHeight: '90vh',
    overflow: 'auto',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  return (
    <div style={overlayStyles} onClick={onClose} className="circuit-dialog-overlay">
      <div
        className={className}
        style={dialogStyles}
        onClick={(e) => e.stopPropagation()}
        {...(other as any)}
      >
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

type DialogTitleWrapperProps = MuiDialogTitleProps;

/**
 * DialogTitle wrapper component
 */
export function DialogTitleWrapper({
  children,
  className,
  sx,
  ...other
}: DialogTitleWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  if (!useCircuit) {
    return (
      <DialogTitle className={className} sx={sx} {...other}>
        {children}
      </DialogTitle>
    );
  }

  const circuitStyles: React.CSSProperties = {
    padding: 'var(--cui-spacings-giga)',
    fontSize: 'var(--cui-headline-s-font-size)',
    fontWeight: 'var(--cui-font-weight-bold)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  return (
    <div className={className} style={circuitStyles} {...other}>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

type DialogContentWrapperProps = MuiDialogContentProps;

/**
 * DialogContent wrapper component
 */
export function DialogContentWrapper({
  children,
  className,
  sx,
  dividers,
  ...other
}: DialogContentWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  if (!useCircuit) {
    return (
      <DialogContent className={className} sx={sx} dividers={dividers} {...other}>
        {children}
      </DialogContent>
    );
  }

  const circuitStyles: React.CSSProperties = {
    padding: dividers ? 'var(--cui-spacings-giga) 0' : '0 var(--cui-spacings-giga)',
    ...(dividers && {
      borderTop: '1px dashed var(--cui-border-subtle)',
      borderBottom: '1px dashed var(--cui-border-subtle)',
      paddingBottom: 'var(--cui-spacings-giga)',
    }),
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  return (
    <div className={className} style={circuitStyles} {...other}>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

type DialogActionsWrapperProps = MuiDialogActionsProps;

/**
 * DialogActions wrapper component
 */
export function DialogActionsWrapper({
  children,
  className,
  sx,
  disableSpacing,
  ...other
}: DialogActionsWrapperProps) {
  const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  if (!useCircuit) {
    return (
      <DialogActions className={className} sx={sx} disableSpacing={disableSpacing} {...other}>
        {children}
      </DialogActions>
    );
  }

  const circuitStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 'var(--cui-spacings-giga)',
    gap: disableSpacing ? 0 : 'var(--cui-spacings-kilo)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  return (
    <div className={className} style={circuitStyles} {...other}>
      {children}
    </div>
  );
}

