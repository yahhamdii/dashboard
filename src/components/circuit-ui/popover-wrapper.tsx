/**
 * Popover Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface PopoverWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean;
    anchorEl?: any;
    onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
    anchorOrigin?: any;
    transformOrigin?: any;
    sx?: any;
    [key: string]: any;
}

export function PopoverWrapper({
    children,
    open,
    anchorEl,
    onClose,
    className,
    sx,
    ...other
}: PopoverWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    // Circuit UI doesn't have a direct Popover equivalent.
    // We'll keep using MUI Popover but through this wrapper.
    if (!open) return null;

    // TODO: Implement proper positioning relative to anchorEl
    // For now, simple centered absolute positioning or just render children

    // Simple overlay implementation
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1300,
                    backgroundColor: 'transparent'
                }}
                onClick={(e) => onClose && onClose({}, 'backdropClick')}
            />
            <div
                className={`popover ${className || ''}`}
                style={{
                    position: 'absolute', // Should be absolute/fixed relative to anchor
                    zIndex: 1301,
                    backgroundColor: 'var(--cui-bg-normal)',
                    borderRadius: 'var(--cui-border-radius-byte)',
                    boxShadow: 'var(--cui-shadow-low)',
                    padding: '8px',
                    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {})
                }}
                {...other as any}
            >
                {children}
            </div>
        </>
    );
}
