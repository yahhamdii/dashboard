import { Controller, useFormContext } from 'react-hook-form';

import {
  BoxWrapper as Box,
  FormGroupWrapper as FormGroup,
  FormLabelWrapper as FormLabel,
  FormControlWrapper as FormControl,
  FormControlLabelWrapper as FormControlLabel,
  SwitchWrapper as Switch,
} from 'src/components/circuit-ui';
import type {
  BoxWrapperProps,
  SwitchWrapperProps,
  FormGroupWrapperProps,
  FormLabelWrapperProps,
  FormControlWrapperProps,
  FormControlLabelWrapperProps,
} from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement> & { sx?: any };

export type RHFSwitchProps = Omit<FormControlLabelWrapperProps, 'control'> & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxWrapperProps;
    switch?: SwitchWrapperProps;
    helperText?: HelperTextProps;
  };
};

export function RHFSwitch({ name, helperText, label, slotProps, sx, ...other }: RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box {...slotProps?.wrapper}>
          <FormControlLabel
            label={label}
            control={
              <Switch
                {...field}
                checked={field.value}
                {...slotProps?.switch}
                slotProps={{
                  ...slotProps?.switch?.slotProps,
                  input: {
                    id: `${name}-switch`,
                    ...(!label && { 'aria-label': `${name} switch` }),
                    ...slotProps?.switch?.slotProps?.input,
                  },
                }}
              />
            }
            sx={[{ mx: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...other}
          />

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

// ----------------------------------------------------------------------

type RHFMultiSwitchProps = FormGroupWrapperProps & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  slotProps?: {
    wrapper?: FormControlWrapperProps;
    switch: SwitchWrapperProps;
    formLabel?: FormLabelWrapperProps;
    helperText?: HelperTextProps;
  };
};

export function RHFMultiSwitch({
  name,
  label,
  options,
  helperText,
  slotProps,
  ...other
}: RHFMultiSwitchProps) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" {...slotProps?.wrapper}>
          {label && (
            <FormLabel
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

          <FormGroup {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Switch
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value, option.value))}
                    {...slotProps?.switch}
                    slotProps={{
                      ...slotProps?.switch?.slotProps,
                      input: {
                        id: `${option.label}-switch`,
                        ...(!option.label && { 'aria-label': `${option.label} switch` }),
                        ...slotProps?.switch?.slotProps?.input,
                      },
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>

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
