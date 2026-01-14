/**
 * FormGroup Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface FormGroupWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    row?: boolean;
    sx?: any;
    [key: string]: any;
}

export function FormGroupWrapper({
    children,
    row,
    className,
    sx,
    ...other
}: FormGroupWrapperProps) {
    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: row ? 'row' : 'column',
        flexWrap: 'wrap',
        gap: '8px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`form-group ${className || ''}`}
            style={circuitStyles}
            role="group"
            {...other}
        >
            {children}
        </div>
    );
}
