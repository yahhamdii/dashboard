/**
 * FormLabel Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface FormLabelWrapperProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    disabled?: boolean;
    error?: boolean;
    focused?: boolean;
    required?: boolean;
    filled?: boolean;
    sx?: any;
    [key: string]: any;
}

export function FormLabelWrapper({
    children,
    className,
    disabled,
    error,
    required,
    sx,
    ...other
}: FormLabelWrapperProps) {
    const circuitStyles: React.CSSProperties = {
        color: error ? 'var(--palette-error-main, #d32f2f)' : disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.6)',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.4375,
        letterSpacing: '0.00938em',
        padding: 0,
        display: 'block',
        transformOrigin: 'top left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 'calc(100% - 24px)',
        position: 'absolute' as 'absolute',
        left: 0,
        top: 0,
        transform: 'translate(0, -1.5px) scale(0.75)',
        transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        marginBottom: '4px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Filter sensitive non-DOM attributes
    const {
        focused,
        filled,
        component,
        ...labelProps
    } = other as any;

    return (
        <label
            className={`form-label ${className || ''}`}
            style={circuitStyles}
            {...(labelProps as React.LabelHTMLAttributes<HTMLLabelElement>)}
        >
            {children}
            {required && <span aria-hidden="true" style={{ color: 'inherit' }}> *</span>}
        </label>
    );
}
