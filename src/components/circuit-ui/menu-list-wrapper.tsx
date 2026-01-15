/**
 * MenuList Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface MenuListWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    sx?: any;
    [key: string]: any;
}

export function MenuListWrapper({
    children,
    className,
    sx,
    ...other
}: MenuListWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

    const circuitStyles: React.CSSProperties = {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Remove MUI props
    const {
        autoFocus,
        autoFocusItem,
        disableListWrap,
        variant,
        ...domProps
    } = other as any;

    return (
        <div
            className={`menu-list ${className || ''}`}
            style={circuitStyles}
            {...domProps}
        >
            {children}
        </div>
    );
}
