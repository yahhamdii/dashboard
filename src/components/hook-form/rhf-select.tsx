import type { ChipWrapperProps } from 'src/components/circuit-ui/chip-wrapper';
import type { SelectWrapperProps } from 'src/components/circuit-ui/select-wrapper';
import type { CheckboxWrapperProps } from 'src/components/circuit-ui/checkbox-wrapper';
import type { InputWrapperProps } from 'src/components/circuit-ui/input-wrapper';
import type { InputLabelWrapperProps } from 'src/components/circuit-ui/input-label-wrapper';
import type { FormControlWrapperProps } from 'src/components/circuit-ui/form-control-wrapper';
import type { FormHelperTextWrapperProps } from 'src/components/circuit-ui/form-helper-text-wrapper';

import { merge } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';

import {
  BoxWrapper as Box,
  ChipWrapper as Chip,
  MenuItemWrapper as MenuItem,
  InputWrapper as TextField,
  InputLabelWrapper as InputLabel,
  FormControlWrapper as FormControl,
  SelectWrapper as Select,
  CheckboxWrapper as Checkbox,
} from 'src/components/circuit-ui';

import { HelperText } from './help-text';

// ----------------------------------------------------------------------

type RHFSelectProps = InputWrapperProps & {
  name: string;
  children: React.ReactNode;
};

export function RHFSelect({
  name,
  children,
  helperText,
  slotProps = {},
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-select`;

  const baseSlotProps: InputWrapperProps['slotProps'] = {
    select: {
      sx: { textTransform: 'capitalize' },
      MenuProps: {
        slotProps: {
          paper: {
            sx: { maxHeight: 240 },
          },
        },
      },
    },
    htmlInput: { id: labelId },
    inputLabel: { htmlFor: labelId },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          // @ts-ignore
          select
          fullWidth
          error={!!error}
          helperText={error?.message ?? helperText}
          slotProps={merge(baseSlotProps, slotProps)}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = FormControlWrapperProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  slotProps?: {
    chip?: ChipWrapperProps;
    select?: SelectWrapperProps;
    checkbox?: CheckboxWrapperProps;
    inputLabel?: InputLabelWrapperProps;
    helperText?: FormHelperTextWrapperProps;
  };
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  slotProps,
  helperText,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-multi-select`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const renderLabel = () => (
          <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
            {label}
          </InputLabel>
        );

        const renderOptions = () =>
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {checkbox && (
                <Checkbox
                  size="small"
                  disableRipple
                  checked={field.value.includes(option.value)}
                  {...slotProps?.checkbox}
                />
              )}

              {option.label}
            </MenuItem>
          ));

        return (
          <FormControl error={!!error} {...other}>
            {label && renderLabel()}

            <Select
              {...field}
              multiple
              displayEmpty={!!placeholder}
              label={label}
              renderValue={(selected) => {
                const selectedItems = options.filter((item) =>
                  (selected as string[]).includes(item.value)
                );

                if (!selectedItems.length && placeholder) {
                  return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
                }

                if (chip) {
                  return (
                    <Box sx={{ gap: 0.5, display: 'flex', flexWrap: 'wrap' }}>
                      {selectedItems.map((item) => (
                        <Chip
                          key={item.value}
                          size="small"
                          variant="filled"
                          label={item.label}
                          {...slotProps?.chip}
                        />
                      ))}
                    </Box>
                  );
                }

                return selectedItems.map((item) => item.label).join(', ');
              }}
              {...slotProps?.select}
              inputProps={{
                id: labelId,
                ...slotProps?.select?.inputProps,
              }}
            >
              {renderOptions()}
            </Select>

            <HelperText
              {...slotProps?.helperText}
              errorMessage={error?.message}
              helperText={helperText}
            />
          </FormControl>
        );
      }}
    />
  );
}
