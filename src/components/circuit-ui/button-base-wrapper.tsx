/**
 * ButtonBase Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import type { ButtonBaseProps as MuiButtonBaseProps } from '@mui/material/ButtonBase';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type ButtonBaseWrapperProps = MuiButtonBaseProps;

export function ButtonBaseWrapper({
    children,
    onClick,
    className,
    sx,
    ...other
}: ButtonBaseWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');

    if (!useCircuit) {
        return (
            <ButtonBase
                onClick={onClick}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </ButtonBase>
        );
    }

    const circuitStyles: React.CSSProperties = {
        padding: 0,
        margin: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        textAlign: 'inherit',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`button-base ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </button>
    );
}
