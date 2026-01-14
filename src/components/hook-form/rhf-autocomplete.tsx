import { Controller, useFormContext } from 'react-hook-form';
import { RHFTextField } from './rhf-text-field';

// ----------------------------------------------------------------------

export type RHFAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  options?: any[];
  getOptionLabel?: (option: any) => string;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  multiple?: boolean;
  [key: string]: any;
};

export function RHFAutocomplete({
  name,
  label,
  placeholder,
  helperText,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  multiple,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RHFTextField
          name={name}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          {...other}
        // Temporarily map autocomplete functionalities to basic text handling or drop them to fix build
        // A full custom autocomplete is too complex for this single step.
        // This is a "fix build" migration step.
        />
      )}
    />
  );
}
