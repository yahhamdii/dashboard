/**
 * Collapse Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Collapse from '@mui/material/Collapse';
import type { CollapseProps as MuiCollapseProps } from '@mui/material/Collapse';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type CollapseWrapperProps = MuiCollapseProps;

export function CollapseWrapper({
    children,
    in: inProp,
    timeout = 'auto',
    unmountOnExit,
    className,
    sx,
    ...other
}: CollapseWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Collapse
                in={inProp}
                timeout={timeout}
                unmountOnExit={unmountOnExit}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </Collapse>
        );
    }

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
        >
            {children}
        </div>
    );
}
