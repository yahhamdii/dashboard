/**
 * ListItemText Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface ListItemTextWrapperProps {
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function ListItemTextWrapper(props: ListItemTextWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_TYPOGRAPHY');

    const {
        primary,
        secondary,
        className,
        sx,
        // Filter out MUI-specific props that are not valid for a <div>
        slotProps,
        slots,
        disableTypography,
        inset,
        primaryTypographyProps,
        secondaryTypographyProps,
        ...other
    } = props as any;

    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`list-item-text ${className || ''}`}
            style={circuitStyles}
            {...other}
        >
            <div style={{ fontWeight: 600, color: 'var(--cui-fg-normal)', fontSize: '0.875rem' }}>
                {primary}
            </div>
            {secondary && (
                <div style={{ color: 'var(--cui-fg-subtle)', fontSize: '0.75rem' }}>
                    {secondary}
                </div>
            )}
        </div>
    );
}
