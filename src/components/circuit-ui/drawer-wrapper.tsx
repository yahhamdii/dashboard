/**
 * Drawer Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Drawer from '@mui/material/Drawer';
import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type DrawerWrapperProps = MuiDrawerProps;

export function DrawerWrapper({
    children,
    open,
    onClose,
    anchor = 'left',
    className,
    sx,
    ...other
}: DrawerWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Drawer
                open={open}
                onClose={onClose}
                anchor={anchor}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </Drawer>
        );
    }

    // Basic implementation for Circuit UI side panels
    if (!open) return null;

    const circuitStyles: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        [anchor]: 0,
        zIndex: 1200,
        width: '320px',
        backgroundColor: 'var(--cui-bg-normal)',
        boxShadow: 'var(--cui-shadow-high)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    const backdropStyles: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1199,
    };

    return (
        <>
            <div style={backdropStyles} onClick={onClose as any} />
            <div
                className={`drawer ${className || ''}`}
                style={circuitStyles}
                {...(other as any)}
            >
                {children}
            </div>
        </>
    );
}
