/**
 * InputAdornment Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import InputAdornment from '@mui/material/InputAdornment';
// import type { InputAdornmentProps as MuiInputAdornmentProps } from '@mui/material/InputAdornment';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface InputAdornmentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: 'start' | 'end';
    sx?: any;
    [key: string]: any;
}

export function InputAdornmentWrapper({
    children,
    position,
    className,
    sx,
    ...other
}: InputAdornmentWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        ...(position === 'start' ? { marginRight: '8px' } : { marginLeft: '8px' }),
        color: 'var(--cui-fg-subtle)',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`input-adornment ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
