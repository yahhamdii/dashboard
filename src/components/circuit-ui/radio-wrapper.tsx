/**
 * Radio Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface RadioWrapperProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checked?: boolean;
    color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
    disabled?: boolean;
    size?: 'small' | 'medium';
    value?: any;
    sx?: any;
    [key: string]: any;
}

export function RadioWrapper({
    className,
    color = 'primary',
    size = 'medium',
    sx,
    ...other
}: RadioWrapperProps) {
    const radioSize = size === 'small' ? '16px' : '20px';

    const circuitStyles: React.CSSProperties = {
        width: radioSize,
        height: radioSize,
        cursor: other.disabled ? 'default' : 'pointer',
        accentColor: `var(--palette-${color}-main, #1976d2)`,
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Filter out non-input props
    const {
        checkedIcon,
        icon,
        inputRef,
        disableRipple,
        edge,
        ...inputProps
    } = other as any;

    return (
        <input
            type="radio"
            className={`radio ${className || ''}`}
            style={circuitStyles}
            {...inputProps}
        />
    );
}
