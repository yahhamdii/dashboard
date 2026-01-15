/**
 * ToggleButtonGroup Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// import { useCircuitComponent } from 'src/lib/feature-flags';

// ----------------------------------------------------------------------

export interface ToggleButtonGroupWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: any;
    exclusive?: boolean;
    onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
    sx?: any;
    [key: string]: any;
}

export function ToggleButtonGroupWrapper({
    children,
    value,
    exclusive,
    onChange,
    className,
    sx,
    ...other
}: ToggleButtonGroupWrapperProps) {
    // const useCircuit = useCircuitComponent('USE_CIRCUIT_BUTTONS');

    const circuitStyles: React.CSSProperties = {
        display: 'inline-flex',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid var(--cui-border-subtle)',
        ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
    };

    // Filter MUI props
    const {
        color,
        fullWidth,
        orientation,
        size,
        ...divProps
    } = other as any;

    return (
        <div
            className={`toggle-button-group ${className || ''}`}
            style={circuitStyles}
            {...divProps}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const childProps = child.props as any;
                    const isSelected = exclusive ? value === childProps.value : (Array.isArray(value) && value.includes(childProps.value));

                    return React.cloneElement(child as React.ReactElement<any>, {
                        ...childProps,
                        selected: isSelected,
                        onClick: (event: React.MouseEvent<HTMLElement>) => {
                            if (onChange) {
                                let newValue;
                                if (exclusive) {
                                    newValue = childProps.value === value ? null : childProps.value;
                                } else {
                                    const valueArray = Array.isArray(value) ? value : [];
                                    const index = valueArray.indexOf(childProps.value);
                                    if (index === -1) {
                                        newValue = [...valueArray, childProps.value];
                                    } else {
                                        newValue = valueArray.filter((v: any) => v !== childProps.value);
                                    }
                                }
                                onChange(event, newValue);
                            }
                            childProps.onClick?.(event);
                        }
                    });
                }
                return child;
            })}
        </div>
    );
}
