/**
 * Grid Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Grid from '@mui/material/Grid';
import type { GridProps as MuiGridProps } from '@mui/material/Grid';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type GridWrapperProps = MuiGridProps & {
    size?: any;
    [key: string]: any;
};

export function GridWrapper({
    children,
    container,
    size,
    spacing,
    className,
    sx,
    ...other
}: GridWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Grid
                container={container}
                size={size}
                spacing={spacing}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </Grid>
        );
    }

    const circuitStyles: React.CSSProperties = {
        ...(container ? {
            display: 'flex',
            flexWrap: 'wrap',
            gap: (typeof spacing === 'number') ? `${spacing * 8}px` : '16px',
            width: '100%',
        } : {
            flexBasis: size?.xs ? `${(size.xs / 12) * 100}%` : 'auto',
            maxWidth: size?.xs ? `${(size.xs / 12) * 100}%` : 'none',
        }),
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`grid-item ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
