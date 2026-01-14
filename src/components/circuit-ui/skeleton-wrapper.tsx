/**
 * Skeleton Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import type { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type SkeletonWrapperProps = MuiSkeletonProps;

export function SkeletonWrapper({
    variant,
    width,
    height,
    className,
    sx,
    ...other
}: SkeletonWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Skeleton
                variant={variant}
                width={width}
                height={height}
                className={className}
                sx={sx}
                {...other}
            />
        );
    }

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
