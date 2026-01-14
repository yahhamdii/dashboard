/**
 * InputLabel Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import type { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type InputLabelWrapperProps = MuiInputLabelProps;

export function InputLabelWrapper({
    children,
    htmlFor,
    className,
    sx,
    ...other
}: InputLabelWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <InputLabel
                htmlFor={htmlFor}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </InputLabel>
        );
    }

    const circuitStyles: React.CSSProperties = {
        color: 'var(--cui-fg-subtle)',
        fontSize: '0.875rem',
        fontWeight: 500,
        marginBottom: '4px',
        display: 'block',
        transformOrigin: 'top left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <label
            htmlFor={htmlFor}
            className={`input-label ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </label>
    );
}
