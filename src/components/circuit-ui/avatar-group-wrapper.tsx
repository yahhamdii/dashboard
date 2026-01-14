/**
 * AvatarGroup Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import type { AvatarGroupProps as MuiAvatarGroupProps } from '@mui/material/AvatarGroup';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface AvatarGroupWrapperProps {
    children?: React.ReactNode;
    max?: number;
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function AvatarGroupWrapper({
    children,
    max,
    className,
    sx,
    ...other
}: AvatarGroupWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: '8px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`avatar-group ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {React.Children.toArray(children).slice(0, max).reverse()}
        </div>
    );
}


