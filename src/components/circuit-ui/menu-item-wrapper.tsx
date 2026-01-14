/**
 * MenuItem Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import type { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type MenuItemWrapperProps = MuiMenuItemProps & {
    href?: string;
    [key: string]: any;
};

export function MenuItemWrapper({
    children,
    onClick,
    disabled,
    selected,
    component,
    className,
    sx,
    ...other
}: MenuItemWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

    if (!useCircuit) {
        const MuiMenuItem = MenuItem as any;
        return (
            <MuiMenuItem
                onClick={onClick}
                disabled={disabled}
                selected={selected}
                component={component}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </MuiMenuItem>
        );
    }

    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: selected ? 'var(--cui-bg-subtle-hovered)' : 'transparent',
        color: 'var(--cui-fg-normal)',
        gap: '12px',
        borderRadius: '4px',
        fontSize: '0.875rem',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    const Component = component || 'div';

    return (
        <Component
            onClick={onClick}
            className={`menu-item ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </Component>
    );
}
