/**
 * Rating Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface RatingWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    name?: string;
    value?: number | null;
    defaultValue?: number;
    precision?: number;
    disabled?: boolean;
    readOnly?: boolean;
    max?: number;
    size?: 'small' | 'medium' | 'large';
    emptyIcon?: React.ReactNode;
    icon?: React.ReactNode;
    highlightSelectedOnly?: boolean;
    onChange?: (event: React.SyntheticEvent, value: number | null) => void;
    onChangeActive?: (event: React.SyntheticEvent, value: number) => void;
    sx?: any;
    [key: string]: any;
}

export function RatingWrapper({
    name,
    value,
    defaultValue = 0,
    precision = 1,
    disabled = false,
    readOnly = false,
    max = 5,
    size = 'medium',
    onChange,
    className,
    sx,
    ...other
}: RatingWrapperProps) {
    const [internalValue, setInternalValue] = React.useState(value ?? defaultValue);
    const [hoverValue, setHoverValue] = React.useState(-1);

    const circuitStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: size === 'small' ? '18px' : size === 'large' ? '30px' : '24px',
        cursor: disabled || readOnly ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    const handleClick = (newValue: number) => {
        if (disabled || readOnly) return;
        setInternalValue(newValue);
        if (onChange) {
            onChange({} as React.SyntheticEvent, newValue);
        }
    };

    const stars = [];
    for (let i = 1; i <= max; i++) {
        const filled = (hoverValue !== -1 ? hoverValue : internalValue) >= i;
        stars.push(
            <span
                key={i}
                onClick={() => handleClick(i)}
                onMouseEnter={() => !disabled && !readOnly && setHoverValue(i)}
                onMouseLeave={() => setHoverValue(-1)}
                style={{
                    color: filled ? 'var(--palette-warning-main, #ffa726)' : 'rgba(0, 0, 0, 0.26)',
                    cursor: disabled || readOnly ? 'default' : 'pointer'
                }}
            >
                ★
            </span>
        );
    }

    return (
        <div
            className={`rating ${className || ''}`}
            style={circuitStyles}
            role="radiogroup"
            {...other}
        >
            {name && <input type="hidden" name={name} value={internalValue || ''} />}
            {stars}
        </div>
    );
}
