/**
 * InputBase Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface InputBaseWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
    multiline?: boolean;
    fullWidth?: boolean;
    rows?: number | string;
    sx?: any;
    inputRef?: React.Ref<any>;
    inputProps?: any;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    [key: string]: any;
}

export function InputBaseWrapper(props: InputBaseWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    const {
        multiline,
        fullWidth,
        rows,
        placeholder,
        className,
        sx,
        // Filter out MUI-specific props
        color,
        error,
        margin,
        size,
        startAdornment,
        endAdornment,
        inputComponent,
        inputRef,
        inputProps,
        minRows,
        maxRows,
        slots,
        slotProps,
        ...other
    } = props as any;

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
                ref={inputRef}
                rows={rows as number}
                placeholder={placeholder}
                className={`input-base-multiline ${className || ''}`}
                style={circuitStyles}
                {...inputProps}
                {...other}
            />
        );
    }

    return (
        <input
            ref={inputRef}
            placeholder={placeholder}
            className={`input-base ${className || ''}`}
            style={circuitStyles}
            {...inputProps}
            {...other}
        />
    );
}
