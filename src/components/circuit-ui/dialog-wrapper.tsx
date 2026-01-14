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

import React from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
// import type { DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
// import type { DialogContentProps as MuiDialogContentProps } from '@mui/material/DialogContent';
// import type { DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface DialogWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: any;
  [key: string]: any;
}

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
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose({} as any, 'backdropClick');
    }
  };

  return (
    <div style={overlayStyles} onClick={handleOverlayClick} className="circuit-dialog-overlay">
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

export interface DialogTitleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any;
  [key: string]: any;
}

/**
 * DialogTitle wrapper component
 */
export function DialogTitleWrapper({
  children,
  className,
  sx,
  ...other
}: DialogTitleWrapperProps) {
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  const circuitStyles: React.CSSProperties = {
    padding: 'var(--cui-spacings-giga)',
    fontSize: 'var(--cui-headline-s-font-size)',
    fontWeight: 'var(--cui-font-weight-bold)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    component,
    ...divProps
  } = other as any;

  return (
    <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface DialogContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
  sx?: any;
  [key: string]: any;
}

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
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  const circuitStyles: React.CSSProperties = {
    padding: dividers ? 'var(--cui-spacings-giga) 0' : '0 var(--cui-spacings-giga)',
    ...(dividers && {
      borderTop: '1px dashed var(--cui-border-subtle)',
      borderBottom: '1px dashed var(--cui-border-subtle)',
      paddingBottom: 'var(--cui-spacings-giga)',
    }),
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    component,
    ...divProps
  } = other as any;

  return (
    <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------

export interface DialogActionsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  disableSpacing?: boolean;
  sx?: any;
  [key: string]: any;
}

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
  // const useCircuit = useCircuitComponent('USE_CIRCUIT_DIALOGS');

  const circuitStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 'var(--cui-spacings-giga)',
    gap: disableSpacing ? 0 : 'var(--cui-spacings-kilo)',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  // Filtrer les props MUI spécifiques
  const {
    classes,
    ...divProps
  } = other as any;

  return (
    <div className={className} style={circuitStyles} {...(divProps as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

