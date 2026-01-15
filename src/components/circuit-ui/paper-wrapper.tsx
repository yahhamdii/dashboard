/**
 * Paper Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface PaperWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    elevation?: number;
    sx?: any;
    [key: string]: any;
}

export function PaperWrapper({
    children,
    className,
    sx,
    ...other
}: PaperWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    const circuitStyles: React.CSSProperties = {
        backgroundColor: 'var(--cui-bg-normal)',
        borderRadius: '8px',
        boxShadow: 'var(--cui-shadow-low)',
        padding: '16px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Remove MUI props
    const {
        elevation,
        square,
        variant, // MUI Paper variant
        ...domProps
    } = other as any;

    return (
        <div
            className={`paper ${className || ''}`}
            style={circuitStyles}
            {...domProps}
        >
            {children}
        </div>
    );
}
