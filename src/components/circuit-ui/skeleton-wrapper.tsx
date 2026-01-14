/**
 * Skeleton Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import Skeleton from '@mui/material/Skeleton';
// import type { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface SkeletonWrapperProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | false;
    sx?: any;
    [key: string]: any;
}

export function SkeletonWrapper({
    variant = 'text',
    width,
    height,
    className,
    sx,
    ...other
}: SkeletonWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    const circuitStyles: React.CSSProperties = {
        backgroundColor: 'var(--cui-bg-subtle-hovered)',
        borderRadius: variant === 'circular' ? '50%' : 'var(--cui-border-radius-byte)',
        width: width || '100%',
        height: height || (variant === 'text' ? '1em' : '100%'),
        display: 'block',
        animation: 'pulse 1.5s ease-in-out infinite',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <span
            className={`skeleton ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        />
    );
}
