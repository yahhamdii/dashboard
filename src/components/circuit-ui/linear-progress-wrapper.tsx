/**
 * LinearProgress Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import type { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type LinearProgressWrapperProps = MuiLinearProgressProps;

export function LinearProgressWrapper({
    value,
    variant = 'indeterminate',
    color = 'primary',
    className,
    sx,
    ...other
}: LinearProgressWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <LinearProgress
                value={value}
                variant={variant}
                color={color}
                className={className}
                sx={sx}
                {...other}
            />
        );
    }

    const circuitStyles: React.CSSProperties = {
        position: 'relative',
        height: '4px',
        display: 'block',
        width: '100%',
        backgroundColor: 'var(--cui-bg-subtle)',
        borderRadius: '2px',
        overflow: 'hidden',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    const progressStyles: React.CSSProperties = {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: color === 'inherit' ? 'currentColor' : 'var(--cui-bg-accent)',
        width: variant === 'determinate' ? `${value}%` : '50%',
        transition: 'width 0.4s linear',
        ...(variant === 'indeterminate' && {
            animation: 'progress-loop 2s infinite linear',
        }),
    };

    return (
        <span
            className={`linear-progress ${className || ''}`}
            style={circuitStyles}
        >
            <span style={progressStyles} />
        </span>
    );
}
