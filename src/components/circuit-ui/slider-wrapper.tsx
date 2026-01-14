/**
 * Slider Wrapper - Compatibilité MUI → Circuit UI
 */

'use client';

import React from 'react';

// ----------------------------------------------------------------------

export interface SliderWrapperProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  name?: string;
  value?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | { value: number; label?: string }[];
  disabled?: boolean;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  orientation?: 'horizontal' | 'vertical';
  track?: 'normal' | false | 'inverted';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
  onChange?: (event: Event, value: number | number[]) => void;
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
  sx?: any;
  [key: string]: any;
}

export function SliderWrapper({
  name,
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = 'horizontal',
  size = 'medium',
  onChange,
  className,
  sx,
  ...other
}: SliderWrapperProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue);
  const sliderRef = React.useRef<HTMLInputElement>(null);

  const circuitStyles: React.CSSProperties = {
    width: orientation === 'horizontal' ? '100%' : size === 'small' ? '4px' : '8px',
    height: orientation === 'vertical' ? '100%' : size === 'small' ? '4px' : '8px',
    ...(sx && typeof sx === 'object' && !Array.isArray(sx) ? (sx as React.CSSProperties) : {}),
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setInternalValue(newValue);
    if (onChange) {
      onChange(event.nativeEvent, newValue);
    }
  };

  const currentValue = Array.isArray(internalValue) ? internalValue[0] : internalValue;

  return (
    <div className={`slider ${className || ''}`} style={circuitStyles} {...other}>
      <input
        ref={sliderRef}
        type="range"
        name={name}
        value={currentValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
        style={{
          width: '100%',
          cursor: disabled ? 'default' : 'pointer',
          accentColor: 'var(--palette-primary-main, #1976d2)',
        }}
      />
    </div>
  );
}
