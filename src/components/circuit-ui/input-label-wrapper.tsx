/**
 * InputLabel Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface InputLabelWrapperProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    sx?: any;
    shrink?: boolean;
    error?: boolean;
    focused?: boolean;
    required?: boolean;
    [key: string]: any;
}

export function InputLabelWrapper(props: InputLabelWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    const {
        children,
        htmlFor,
        className,
        sx,
        // Filter out MUI-specific props
        disableAnimation,
        shrink,
        variant,
        color,
        focused,
        margin,
        required,
        size,
        error,
        slotProps,
        slots,
        ...other
    } = props as any;

    const circuitStyles: React.CSSProperties = {
        color: 'var(--cui-fg-subtle)',
        fontSize: '0.875rem',
        fontWeight: 500,
        marginBottom: '4px',
        display: 'block',
        transformOrigin: 'top left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <label
            htmlFor={htmlFor}
            className={`input-label ${className || ''}`}
            style={circuitStyles}
            {...other}
        >
            {children}
        </label>
    );
}
