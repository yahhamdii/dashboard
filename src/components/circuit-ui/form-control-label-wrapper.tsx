/**
 * FormControlLabel Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type FormControlLabelWrapperProps = MuiFormControlLabelProps;

export function FormControlLabelWrapper({
    control,
    label,
    labelPlacement = 'end',
    className,
    sx,
    ...other
}: FormControlLabelWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <FormControlLabel
                control={control}
                label={label}
                labelPlacement={labelPlacement}
                className={className}
                sx={sx}
                {...other}
            />
        );
    }

    const circuitStyles: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexDirection: labelPlacement === 'start' ? 'row-reverse' : (labelPlacement === 'top' ? 'column-reverse' : (labelPlacement === 'bottom' ? 'column' : 'row')),
        cursor: 'pointer',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    return (
        <label
            className={`form-control-label ${className || ''}`}
            style={circuitStyles}
        >
            {control}
            <span className="label-text">{label}</span>
        </label>
    );
}
