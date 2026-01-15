/**
 * DatePicker Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { DateInput } from '@sumup-oss/circuit-ui';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface DatePickerWrapperProps {
    value?: any;
    onChange?: (value: any) => void;
    label?: string;
    slotProps?: any;
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function DatePickerWrapper({
    value,
    onChange,
    label,
    slotProps,
    className,
    sx,
    ...other
}: DatePickerWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    // Simple placeholder for DatePicker
    return (
        <div
            className={`date-picker ${className || ''}`}
            style={{
                padding: '10px',
                border: '1px solid var(--cui-border-subtle)',
                borderRadius: '4px',
                ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {})
            }}
        >
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '4px', color: 'var(--cui-fg-subtle)' }}>
                {label} (Not Implemented)
            </label>
            <input
                type="date"
                value={value ? new Date(value).toISOString().split('T')[0] : ''}
                onChange={(e) => onChange && onChange(new Date(e.target.value))}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--cui-border-subtle)' }}
            />
        </div>
    );
}
