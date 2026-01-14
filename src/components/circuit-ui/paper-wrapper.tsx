/**
 * Paper Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Paper from '@mui/material/Paper';
import type { PaperProps as MuiPaperProps } from '@mui/material/Paper';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type PaperWrapperProps = MuiPaperProps;

export function PaperWrapper({
    children,
    className,
    sx,
    ...other
}: PaperWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Paper
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </Paper>
        );
    }

    const circuitStyles: React.CSSProperties = {
        backgroundColor: 'var(--cui-bg-normal)',
        borderRadius: '8px',
        boxShadow: 'var(--cui-shadow-low)',
        padding: '16px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`paper ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
