/**
 * InputBase Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import InputBase from '@mui/material/InputBase';
import type { InputBaseProps as MuiInputBaseProps } from '@mui/material/InputBase';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type InputBaseWrapperProps = MuiInputBaseProps;

export function InputBaseWrapper({
    multiline,
    fullWidth,
    rows,
    placeholder,
    className,
    sx,
    ...other
}: InputBaseWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <InputBase
                multiline={multiline}
                fullWidth={fullWidth}
                rows={rows}
                placeholder={placeholder}
                className={className}
                sx={sx}
                {...other}
            />
        );
    }

    const circuitStyles: React.CSSProperties = {
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: '8px',
        resize: 'none',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    if (multiline) {
        return (
            <textarea
                rows={rows as number}
                placeholder={placeholder}
                className={`input-base-multiline ${className || ''}`}
                style={circuitStyles}
                {...(other as any)}
            />
        );
    }

    return (
        <input
            placeholder={placeholder}
            className={`input-base ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        />
    );
}
