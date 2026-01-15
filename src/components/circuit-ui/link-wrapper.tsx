/**
 * Link Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface LinkWrapperProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    component?: React.ElementType;
    underline?: 'none' | 'hover' | 'always';
    sx?: any;
    [key: string]: any;
}

export function LinkWrapper({
    children,
    component,
    href,
    color,
    underline,
    className,
    sx,
    ...other
}: LinkWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

    const circuitStyles: React.CSSProperties = {
        color: color === 'inherit' ? 'inherit' : 'var(--cui-fg-accent)',
        textDecoration: underline === 'none' ? 'none' : 'underline',
        cursor: 'pointer',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    const Component = component || 'a';

    // Remove MUI props that might cause issues if passed to DOM
    const {
        variant,
        typographyClasses,
        ...domProps
    } = other as any;

    return (
        <Component
            href={href}
            className={`link ${className || ''}`}
            style={circuitStyles}
            {...domProps}
        >
            {children}
        </Component>
    );
}
