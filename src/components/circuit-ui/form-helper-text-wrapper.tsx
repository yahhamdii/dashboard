/**
 * FormHelperText Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface FormHelperTextWrapperProps extends React.HTMLAttributes<HTMLParagraphElement> {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense' | 'none';
    required?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
    sx?: any;
    [key: string]: any;
}

export function FormHelperTextWrapper({
    children,
    className,
    disabled,
    error,
    sx,
    ...other
}: FormHelperTextWrapperProps) {
    const circuitStyles: React.CSSProperties = {
        color: error ? 'var(--palette-error-main, #d32f2f)' : disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.6)',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        textAlign: 'left' as 'left',
        marginTop: '3px',
        marginRight: '14px',
        marginBottom: 0,
        marginLeft: '14px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Filter sensitive non-DOM attributes
    const {
        filled,
        focused,
        margin,
        required,
        variant,
        component,
        ...pProps
    } = other as any;

    return (
        <p
            className={`form-helper-text ${className || ''}`}
            style={circuitStyles}
            {...(pProps as React.HTMLAttributes<HTMLParagraphElement>)}
        >
            {children}
        </p>
    );
}
