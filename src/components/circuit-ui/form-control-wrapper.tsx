/**
 * FormControl Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import FormControl from '@mui/material/FormControl';
import type { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type FormControlWrapperProps = MuiFormControlProps;

export function FormControlWrapper({
    children,
    fullWidth,
    className,
    sx,
    ...other
}: FormControlWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <FormControl
                fullWidth={fullWidth}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </FormControl>
        );
    }

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

    return (
        <div
            className={`form-control ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
