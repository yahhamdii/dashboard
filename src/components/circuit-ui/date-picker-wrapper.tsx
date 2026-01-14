/**
 * DatePicker Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';

// import { DateInput } from '@sumup-oss/circuit-ui';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type DatePickerWrapperProps = any;

export function DatePickerWrapper({
    value,
    onChange,
    label,
    slotProps,
    className,
    sx,
    ...other
}: DatePickerWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <DatePicker
                value={value}
                onChange={onChange}
                label={label}
                slotProps={slotProps}
                sx={sx}
                {...other}
            />
        );
    }

    // TODO: Implémenter avec Circuit UI DateInput
    return (
        <DatePicker
            value={value}
            onChange={onChange}
            label={label}
            slotProps={{
                ...slotProps,
                textField: {
                    ...slotProps?.textField,
                    // Styles Circuit UI pour le champ texte
                }
            }}
            sx={[
                {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--cui-border-subtle)',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        />
    );
}
