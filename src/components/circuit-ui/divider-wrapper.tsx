/**
 * Divider Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Divider from '@mui/material/Divider';
import type { DividerProps as MuiDividerProps } from '@mui/material/Divider';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type DividerWrapperProps = MuiDividerProps;

export function DividerWrapper({
    className,
    sx,
    orientation = 'horizontal',
    ...other
}: DividerWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Divider
                className={className}
                sx={sx}
                orientation={orientation}
                {...other}
            />
        );
    }

    const circuitStyles: React.CSSProperties = {
        backgroundColor: 'var(--cui-border-divider)',
        ...(orientation === 'horizontal' ? {
            height: '1px',
            width: '100%',
            margin: '16px 0',
        } : {
            width: '1px',
            height: '100%',
            margin: '0 16px',
        }),
        border: 'none',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <hr
            className={`divider ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        />
    );
}
