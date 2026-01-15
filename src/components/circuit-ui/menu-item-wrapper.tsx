/**
 * MenuItem Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface MenuItemWrapperProps extends React.HTMLAttributes<HTMLElement> {
    href?: string;
    selected?: boolean;
    disabled?: boolean;
    component?: React.ElementType;
    sx?: any;
    [key: string]: any;
}

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
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

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

    // Remove MUI props
    const {
        disableGutters,
        divider,
        autoFocus,
        ...domProps
    } = other as any;

    return (
        <Component
            onClick={onClick}
            className={`menu-item ${className || ''}`}
            style={circuitStyles}
            {...domProps}
        >
            {children}
        </Component>
    );
}
