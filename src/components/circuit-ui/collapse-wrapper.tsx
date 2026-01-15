/**
 * Collapse Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface CollapseWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    in?: boolean;
    timeout?: any;
    unmountOnExit?: boolean;
    sx?: any;
    [key: string]: any;
}

export function CollapseWrapper({
    children,
    in: inProp,
    timeout = 'auto',
    unmountOnExit,
    className,
    sx,
    ...other
}: CollapseWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    // Simple implementation for Circuit UI
    if (!inProp && unmountOnExit) {
        return null;
    }

    const circuitStyles: React.CSSProperties = {
        overflow: 'hidden',
        height: inProp ? 'auto' : '0px',
        opacity: inProp ? 1 : 0,
        transition: 'height 0.3s ease, opacity 0.3s ease',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`collapse ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
