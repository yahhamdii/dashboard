/**
 * Chip Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface ChipWrapperProps {
    label?: React.ReactNode;
    onDelete?: React.EventHandler<any>;
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function ChipWrapper({
    label,
    onDelete,
    className,
    sx,
    ...other
}: ChipWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    const circuitStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '24px',
        padding: '0 8px',
        borderRadius: '12px',
        backgroundColor: 'var(--cui-bg-subtle)',
        color: 'var(--cui-fg-normal)',
        fontSize: '0.75rem',
        fontWeight: 500,
        gap: '4px',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <div
            className={`chip ${className || ''}`}
            style={circuitStyles}
            {...(other as any)}
        >
            <span>{label}</span>
            {onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    style={{
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--cui-fg-subtle)',
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
                    </svg>
                </button>
            )}
        </div>
    );
}
