/**
 * ToggleButton Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import type { ToggleButtonProps as MuiToggleButtonProps } from '@mui/material/ToggleButton';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface ToggleButtonWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: any;
    selected?: boolean;
    sx?: any;
    [key: string]: any;
}

export function ToggleButtonWrapper(props: ToggleButtonWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');

    const {
        children,
        value,
        selected,
        onClick,
        className,
        sx,
        // Filter out MUI-specific props
        color,
        disableFocusRipple,
        fullWidth,
        size,
        action,
        centerRipple,
        disableRipple,
        disableTouchRipple,
        focusRipple,
        focusVisibleClassName,
        LinkComponent,
        onFocusVisible,
        TouchRippleProps,
        touchRippleRef,
        slotProps,
        slots,
        ...other
    } = props as any;

    const circuitStyles: React.CSSProperties = {
        padding: '8px',
        border: `1px solid ${selected ? 'var(--cui-border-accent)' : 'var(--cui-border-subtle)'}`,
        backgroundColor: selected ? 'var(--cui-bg-accent-subtle)' : 'var(--cui-bg-normal)',
        color: selected ? 'var(--cui-fg-accent)' : 'var(--cui-fg-normal)',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`toggle-button ${className || ''}`}
            style={circuitStyles}
            {...other}
        >
            {children}
        </button>
    );
}
