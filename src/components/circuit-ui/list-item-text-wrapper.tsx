/**
 * ListItemText Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import type { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type ListItemTextWrapperProps = MuiListItemTextProps;

export function ListItemTextWrapper({
    primary,
    secondary,
    className,
    sx,
    ...other
}: ListItemTextWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_TYPOGRAPHY');

    if (!useCircuit) {
        return (
            <ListItemText
                primary={primary}
                secondary={secondary}
                className={className}
                sx={sx}
                {...other}
            />
        );
    }

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
            {...(other as any)}
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
