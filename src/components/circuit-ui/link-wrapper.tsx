/**
 * Link Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Link from '@mui/material/Link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type LinkWrapperProps = MuiLinkProps & {
    [key: string]: any;
};

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
    const useCircuit = useCircuitComponent('USE_CIRCUIT_NAVIGATION');

    if (!useCircuit) {
        const MuiLink = Link as any;
        return (
            <MuiLink
                component={component}
                href={href}
                color={color}
                underline={underline}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </MuiLink>
        );
    }

    const circuitStyles: React.CSSProperties = {
        color: color === 'inherit' ? 'inherit' : 'var(--cui-fg-accent)',
        textDecoration: underline === 'none' ? 'none' : 'underline',
        cursor: 'pointer',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    const Component = component || 'a';

    return (
        <Component
            href={href}
            className={`link ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </Component>
    );
}
