/**
 * Fab Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Fab from '@mui/material/Fab';
import type { FabProps as MuiFabProps } from '@mui/material/Fab';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type FabWrapperProps = MuiFabProps;

export function FabWrapper({
    children,
    size = 'large',
    color = 'default',
    variant = 'circular',
    onClick,
    className,
    sx,
    ...other
}: FabWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');

    if (!useCircuit) {
        return (
            <Fab
                size={size}
                color={color}
                variant={variant}
                onClick={onClick}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </Fab>
        );
    }

    const circuitStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: variant === 'extended' ? '24px' : '50%',
        padding: variant === 'extended' ? '8px 16px' : '8px',
        border: 'none',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        backgroundColor: color === 'inherit' ? 'var(--cui-bg-subtle)' : 'var(--cui-bg-accent)',
        color: color === 'inherit' ? 'var(--cui-fg-normal)' : 'var(--cui-fg-on-accent)',
        gap: '8px',
        transition: 'background-color 0.2s',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`fab ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </button>
    );
}
