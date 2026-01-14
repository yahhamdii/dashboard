import type { Theme, Components } from '@mui/material/styles';

import { datePicker } from './mui-x-date-picker';

// ----------------------------------------------------------------------

export const components: Components<Theme> = {
  // ➤➤ MUI X ➤➤
  ...datePicker,
};
