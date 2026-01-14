/**
 * FormControl Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import FormControl from '@mui/material/FormControl';
// import type { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface FormControlWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    fullWidth?: boolean;
    error?: boolean;
    focused?: boolean;
    disabled?: boolean;
    required?: boolean;
    sx?: any;
    [key: string]: any;
}

export function FormControlWrapper({
    children,
    fullWidth,
    className,
    sx,
    ...other
}: FormControlWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    const circuitStyles: React.CSSProperties = {
        display: 'inline-flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: 0,
        padding: 0,
        margin: 0,
        border: 0,
        verticalAlign: 'top',
        width: fullWidth ? '100%' : 'auto',
        gap: '4px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Filter sensitive non-DOM attributes 
    const {
        error,
        focused,
        disabled,
        required,
        variant, // MUI form variant
        color,
        size,
        hiddenLabel,
        margin,
        ...divProps
    } = other as any;

    return (
        <div
            className={`form-control ${className || ''}`}
            style={circuitStyles}
            {...(divProps as React.HTMLAttributes<HTMLDivElement>)}
        >
            {children}
        </div>
    );
}
