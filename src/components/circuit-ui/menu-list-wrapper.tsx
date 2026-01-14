/**
 * MenuList Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import MenuList from '@mui/material/MenuList';
import type { MenuListProps as MuiMenuListProps } from '@mui/material/MenuList';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type MenuListWrapperProps = MuiMenuListProps;

export function MenuListWrapper({
    children,
    className,
    sx,
    ...other
}: MenuListWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

    if (!useCircuit) {
        return (
            <MenuList className={className} sx={sx} {...other}>
                {children}
            </MenuList>
        );
    }

    const circuitStyles: React.CSSProperties = {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`menu-list ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
