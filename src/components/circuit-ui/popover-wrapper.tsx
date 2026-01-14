/**
 * Popover Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';
import Popover from '@mui/material/Popover';
import type { PopoverProps as MuiPopoverProps } from '@mui/material/Popover';

import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

type PopoverWrapperProps = MuiPopoverProps;

export function PopoverWrapper({
    children,
    open,
    anchorEl,
    onClose,
    className,
    sx,
    ...other
}: PopoverWrapperProps) {
    const useCircuit = useCircuitComponent('USE_CIRCUIT_LAYOUTS');

    // Circuit UI doesn't have a direct Popover equivalent.
    // We'll keep using MUI Popover but through this wrapper.

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            className={className}
            sx={sx}
            {...other}
        >
            {children}
        </Popover>
    );
}
