/**
 * Autocomplete Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import type { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface AutocompleteWrapperProps<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
> {
    options: ReadonlyArray<T>;
    renderInput: (params: any) => React.ReactNode;
    className?: string;
    sx?: any;
    [key: string]: any;
}

export function AutocompleteWrapper<
    T,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
>(props: AutocompleteWrapperProps<T, Multiple, DisableClearable, FreeSolo>) {
    const { options, renderInput, className, sx, ...other } = props;
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_FORMS');

    // Very basic implementation: just render the input for now
    // Real Autocomplete is complex to replicate in vanilla CSS
    return renderInput({
        className: `autocomplete ${className || ''}`,
        style: (sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
        ...other
    } as any);
}


