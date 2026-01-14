/**
 * RadioGroup Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface RadioGroupWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: any;
  defaultValue?: any;
  row?: boolean;
  sx?: any;
  [key: string]: any;
}

export function RadioGroupWrapper({
  children,
  name,
  value,
  defaultValue,
  row,
  className,
  sx,
  onChange,
  ...other
}: RadioGroupWrapperProps) {
  const circuitStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
    flexWrap: 'wrap',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  return (
    <div
      className={`radio-group ${className || ''}`}
      style={circuitStyles}
      role="radiogroup"
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childProps = child.props as any;
          return React.cloneElement(child, {
            name,
            onChange,
            ...(value !== undefined && { checked: childProps.value === value }),
            ...(defaultValue !== undefined &&
              value === undefined && { defaultChecked: childProps.value === defaultValue }),
          } as any);
        }
        return child;
      })}
    </div>
  );
}
