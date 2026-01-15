/**
 * ButtonBase Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface ButtonBaseWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    sx?: any;
    // Add other specific props if needed, or rely on [key: string]: any
    [key: string]: any;
}

export function ButtonBaseWrapper(props: ButtonBaseWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS'); // Removed

    const {
        children,
        onClick,
        className,
        sx,
        // Filter out MUI-specific props that are not valid for a <button>
        action,
        centerRipple,
        disableRipple,
        disableTouchRipple,
        focusRipple,
        focusVisibleClassName,
        LinkComponent,
        onFocusVisible,
        TouchRippleProps,
        touchRippleRef,
        slotProps,
        slots,
        component,
        href,
        type,
        ...other
    } = props as any;

    const circuitStyles: React.CSSProperties = {
        padding: 0,
        margin: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        textAlign: 'inherit',
        textDecoration: 'none', // Reset text decoration for links
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    let Component: any = component || 'button';
    if (!component && href) {
        Component = 'a';
    }

    const extraProps: any = {};
    if (Component === 'button') {
        extraProps.type = type || 'button';
    }
    if (href) {
        extraProps.href = href;
    }

    return (
        <Component
            onClick={onClick}
            className={`button-base ${className || ''}`}
            style={circuitStyles}
            {...extraProps}
            {...other}
        >
            {children}
        </Component>
    );
}
