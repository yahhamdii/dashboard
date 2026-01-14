/**
 * Autocomplete Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import type { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type AutocompleteWrapperProps<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
> = MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

export function AutocompleteWrapper<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
>(props: AutocompleteWrapperProps<T, Multiple, DisableClearable, FreeSolo>) {
    const { options, renderInput, className, sx, ...other } = props;
    const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    if (!useCircuit) {
        return (
            <Autocomplete
                options={options}
                renderInput={renderInput}
                className={className}
                sx={sx}
                {...(other as any)}
            />
        );
    }

    // Very basic implementation: just render the input for now
    // Real Autocomplete is complex to replicate in vanilla CSS
    return renderInput({
        className: `autocomplete ${className || ''}`,
        style: (sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    } as any);
}
