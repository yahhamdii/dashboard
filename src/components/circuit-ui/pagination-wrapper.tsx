/**
 * Pagination Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Pagination from '@mui/material/Pagination';
import type { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type PaginationWrapperProps = MuiPaginationProps;

export function PaginationWrapper({
    count,
    page,
    onChange,
    className,
    sx,
    ...other
}: PaginationWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    if (!useCircuit) {
        return (
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                className={className}
                sx={sx}
                {...other}
            />
        );
    }

    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        gap: '4px',
        justifyContent: 'center',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <nav aria-label="pagination" className={className} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ul style={circuitStyles}>
                {Array.from({ length: count || 0 }).map((_, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            onClick={(e) => onChange?.(e as any, index + 1)}
                            style={{
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                border: '1px solid var(--cui-border-subtle)',
                                backgroundColor: page === index + 1 ? 'var(--cui-bg-accent)' : 'transparent',
                                color: page === index + 1 ? 'var(--cui-fg-on-accent)' : 'var(--cui-fg-normal)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                            }}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
