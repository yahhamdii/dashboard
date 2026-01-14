import type { RadioWrapperProps } from 'src/components/circuit-ui/radio-wrapper';
import type { FormLabelWrapperProps } from 'src/components/circuit-ui/form-label-wrapper';
import type { RadioGroupWrapperProps } from 'src/components/circuit-ui/radio-group-wrapper';
import type { FormControlWrapperProps } from 'src/components/circuit-ui/form-control-wrapper';
import type { FormHelperTextWrapperProps } from 'src/components/circuit-ui/form-helper-text-wrapper';

import { Controller, useFormContext } from 'react-hook-form';

import {
  RadioWrapper as Radio,
  FormLabelWrapper as FormLabel,
  RadioGroupWrapper as RadioGroup,
  FormControlWrapper as FormControl,
  FormControlLabelWrapper as FormControlLabel,
} from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

export type RHFRadioGroupProps = RadioGroupWrapperProps & {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: FormControlWrapperProps;
    radio?: RadioWrapperProps;
    formLabel?: FormLabelWrapperProps;
    helperText?: FormHelperTextWrapperProps;
  };
};

export function RHFRadioGroup({
  sx,
  name,
  label,
  options,
  helperText,
  slotProps,
  ...other
}: RHFRadioGroupProps) {
  const { control } = useFormContext();

  const labelledby = `${name}-radios`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" {...slotProps?.wrapper}>
          {label && (
            <FormLabel
              id={labelledby}
              component="legend"
              {...slotProps?.formLabel}
              sx={[
                { mb: 1, typography: 'body2' },
                ...(Array.isArray(slotProps?.formLabel?.sx)
                  ? slotProps.formLabel.sx
                  : [slotProps?.formLabel?.sx]),
              ]}
            >
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} sx={sx} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    {...slotProps?.radio}
                    slotProps={{
                      ...slotProps?.radio?.slotProps,
                      input: {
                        id: `${option.label}-radio`,
                        ...(!option.label && { 'aria-label': `${option.label} radio` }),
                        ...slotProps?.radio?.slotProps?.input,
                      },
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </RadioGroup>

          <HelperText
            {...slotProps?.helperText}
            disableGutters
            errorMessage={error?.message}
            helperText={helperText}
          />
        </FormControl>
      )}
    />
  );
}
