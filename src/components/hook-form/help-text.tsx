import type { FormHelperTextWrapperProps } from 'src/components/circuit-ui/form-helper-text-wrapper';

import { FormHelperTextWrapper as FormHelperText } from 'src/components/circuit-ui';

// ----------------------------------------------------------------------

export type HelperTextProps = FormHelperTextWrapperProps & {
  errorMessage?: string;
  disableGutters?: boolean;
  helperText?: React.ReactNode;
};

export function HelperText({
  sx,
  helperText,
  errorMessage,
  disableGutters = false,
  ...other
}: HelperTextProps) {
  const message = errorMessage ?? helperText;

  if (!message) {
    return null;
  }

  return (
    <FormHelperText
      error={!!errorMessage}
      sx={[{ mx: disableGutters ? 0 : 1.5 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      {errorMessage || helperText}
    </FormHelperText>
  );
}
