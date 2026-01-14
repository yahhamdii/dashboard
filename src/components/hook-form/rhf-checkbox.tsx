import type { BoxWrapperProps } from 'src/components/circuit-ui/box-wrapper';
import type { CheckboxWrapperProps } from 'src/components/circuit-ui/checkbox-wrapper';
import type { FormGroupWrapperProps } from 'src/components/circuit-ui/form-group-wrapper';
import type { FormLabelWrapperProps } from 'src/components/circuit-ui/form-label-wrapper';
import type { FormControlWrapperProps } from 'src/components/circuit-ui/form-control-wrapper';
import type { FormHelperTextWrapperProps } from 'src/components/circuit-ui/form-helper-text-wrapper';
import type { FormControlLabelWrapperProps } from 'src/components/circuit-ui/form-control-label-wrapper';

import { Controller, useFormContext } from 'react-hook-form';

import {
  BoxWrapper as Box,
  FormGroupWrapper as FormGroup,
  FormLabelWrapper as FormLabel,
  FormControlWrapper as FormControl,
  FormControlLabelWrapper as FormControlLabel,
  CheckboxWrapper as Checkbox,
} from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

type RHFCheckboxProps = Omit<FormControlLabelWrapperProps, 'control'> & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxWrapperProps;
    checkbox?: CheckboxWrapperProps;
    helperText?: FormHelperTextWrapperProps;
  };
};

export function RHFCheckbox({
  sx,
  name,
  label,
  slotProps,
  helperText,
  ...other
}: RHFCheckboxProps) {
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
              <Checkbox
                {...field}
                checked={field.value}
                {...slotProps?.checkbox}
                slotProps={{
                  ...slotProps?.checkbox?.slotProps,
                  input: {
                    id: `${name}-checkbox`,
                    ...(!label && { 'aria-label': `${name} checkbox` }),
                    ...slotProps?.checkbox?.slotProps?.input,
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

type RHFMultiCheckboxProps = FormGroupWrapperProps & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  slotProps?: {
    wrapper?: FormControlWrapperProps;
    checkbox?: CheckboxWrapperProps;
    formLabel?: FormLabelWrapperProps;
    helperText?: FormHelperTextWrapperProps;
  };
};

export function RHFMultiCheckbox({
  name,
  label,
  options,
  slotProps,
  helperText,
  ...other
}: RHFMultiCheckboxProps) {
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
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value, option.value))}
                    {...slotProps?.checkbox}
                    slotProps={{
                      ...slotProps?.checkbox?.slotProps,
                      input: {
                        id: `${option.label}-checkbox`,
                        ...(!option.label && { 'aria-label': `${option.label} checkbox` }),
                        ...slotProps?.checkbox?.slotProps?.input,
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
