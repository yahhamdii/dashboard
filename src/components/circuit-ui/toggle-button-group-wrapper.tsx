/**
 * ToggleButtonGroup Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type ToggleButtonGroupWrapperProps = MuiToggleButtonGroupProps;

export function ToggleButtonGroupWrapper({
    children,
    value,
    exclusive,
    onChange,
    className,
    sx,
    ...other
}: ToggleButtonGroupWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');

    if (!useCircuit) {
        return (
            <ToggleButtonGroup
                value={value}
                exclusive={exclusive}
                onChange={onChange}
                className={className}
                sx={sx}
                {...other}
            >
                {children}
            </ToggleButtonGroup>
        );
    }

    const circuitStyles: React.CSSProperties = {
        display: 'inline-flex',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid var(--cui-border-subtle)',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`toggle-button-group ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            {children}
        </div>
    );
}
