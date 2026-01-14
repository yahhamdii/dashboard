import React, { useRef } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export interface RHFCodesProps {
  name: string;
  length?: number;
  maxSize?: number;
  placeholder?: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: React.ComponentProps<typeof Box>;
    helperText?: React.ComponentProps<typeof HelperText>;
    input?: React.InputHTMLAttributes<HTMLInputElement>;
  };
}

export function RHFCode({
  name,
  slotProps,
  helperText,
  maxSize = 56,
  placeholder = '-',
  ...other
}: RHFCodesProps) {
  const { control } = useFormContext();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box
          {...slotProps?.wrapper}
          sx={{
            display: 'flex',
            gap: 8,
            ...(slotProps?.wrapper?.sx as any),
          }}
        >
          {Array.from({ length: other.length ?? 6 }).map((_, index) => {
            const value: string = field.value || '';
            const char = value[index] ?? '';

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const nextChar = e.target.value.slice(-1);
              const chars = value.split('');
              chars[index] = nextChar;
              const nextValue = chars.join('');
              field.onChange(nextValue);

              if (nextChar && index < (other.length ?? 6) - 1) {
                inputsRef.current[index + 1]?.focus();
              }
            };

            const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Backspace' && !char && index > 0) {
                inputsRef.current[index - 1]?.focus();
              }
            };

            return (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={char}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={placeholder}
                style={{
                  width: maxSize,
                  height: maxSize,
                  textAlign: 'center',
                  borderRadius: 8,
                  border: error ? '1px solid var(--cui-border-strong)' : '1px solid var(--cui-border-subtle)',
                }}
                {...slotProps?.input}
              />
            );
          })}

          <HelperText
            {...slotProps?.helperText}
            errorMessage={error?.message}
            helperText={helperText}
          />
        </Box>
      )}
    />
  );
}
