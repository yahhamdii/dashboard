/**
 * Divider Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import Divider from '@mui/material/Divider';
// import type { DividerProps as MuiDividerProps } from '@mui/material/Divider';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface DividerWrapperProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
    sx?: any;
    absolute?: boolean;
    flexItem?: boolean;
    light?: boolean;
    variant?: 'fullWidth' | 'inset' | 'middle';
    [key: string]: any;
}

export function DividerWrapper(props: DividerWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    const {
        className,
        sx,
        orientation = 'horizontal',
        // Filter out MUI-specific props
        absolute,
        flexItem,
        light,
        textAlign,
        variant,
        component,
        slots,
        slotProps,
        children,
        ...other
    } = props as any;

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
            {...other}
        />
    );
}
