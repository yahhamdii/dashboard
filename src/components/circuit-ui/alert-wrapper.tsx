/**
 * Alert Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import Alert from '@mui/material/Alert'; // Removed
// import type { AlertProps as MuiAlertProps } from '@mui/material/Alert'; // Removed

// import { useCircuitComponent } from 'src/lib/feature-flags'; // Removed

// ----------------------------------------------------------------------

export interface AlertWrapperProps {
    children?: React.ReactNode;
    severity?: 'success' | 'info' | 'warning' | 'error';
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function AlertWrapper({
    children,
    severity = 'info',
    className,
    sx,
    ...other
}: AlertWrapperProps) {
    // Default to true/Circuit UI

    const colorClasses =
        severity === 'success' ? 'bg-green-100 text-green-800 border-green-200' :
            severity === 'warning' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                severity === 'error' ? 'bg-red-100 text-red-800 border-red-200' :
                    'bg-blue-100 text-blue-800 border-blue-200';

    const circuitStyles: React.CSSProperties = {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid currentColor',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.875rem',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            role="alert"
            className={`alert ${colorClasses} ${className || ''}`}
            style={circuitStyles}
            {...other}
        >
            {children}
        </div>
    );
}
