/**
 * Component Props Types
 *
 * Types de props pour les composants, remplaçant les imports @mui/material.
 * Ces types sont compatibles avec l'API des wrappers Circuit UI.
 */

import type { CSSProperties, ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, FormHTMLAttributes } from 'react';

// ----------------------------------------------------------------------
// Base Types
// ----------------------------------------------------------------------

export type SxProps = CSSProperties | Record<string, any>;

export interface BaseProps {
  sx?: SxProps;
  className?: string;
  children?: ReactNode;
}

// ----------------------------------------------------------------------
// Layout Components
// ----------------------------------------------------------------------

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  component?: React.ElementType;
}

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  fixed?: boolean;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  spacing?: number | string;
  divider?: ReactNode;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
}

export interface GridProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  container?: boolean;
  item?: boolean;
  spacing?: number | string | object;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  size?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: string;
  alignItems?: string;
}

export interface PaperProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
}

// ----------------------------------------------------------------------
// Typography
// ----------------------------------------------------------------------

export interface TypographyProps extends HTMLAttributes<HTMLElement>, BaseProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
  component?: React.ElementType;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit' | 'textPrimary' | 'textSecondary' | 'textDisabled' | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
}

// ----------------------------------------------------------------------
// Buttons
// ----------------------------------------------------------------------

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: 'text' | 'outlined' | 'contained' | 'soft';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  loadingPosition?: 'start' | 'end' | 'center';
  href?: string;
  component?: React.ElementType;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  edge?: 'start' | 'end' | false;
}

export interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'extended';
}

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  component?: React.ElementType;
  href?: string;
  disableRipple?: boolean;
  disableTouchRipple?: boolean;
  focusRipple?: boolean;
  centerRipple?: boolean;
}

// ----------------------------------------------------------------------
// Form Components
// ----------------------------------------------------------------------

export interface FormControlProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  component?: React.ElementType;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  hiddenLabel?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
  focused?: boolean;
}

export interface FormControlLabelProps extends HTMLAttributes<HTMLLabelElement>, BaseProps {
  control: ReactNode;
  label: ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  disabled?: boolean;
  value?: any;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  row?: boolean;
}

export interface FormLabelProps extends HTMLAttributes<HTMLLabelElement>, BaseProps {
  component?: React.ElementType;
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export interface FormHelperTextProps extends HTMLAttributes<HTMLParagraphElement>, BaseProps {
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  margin?: 'dense';
  required?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
}

export interface InputLabelProps extends HTMLAttributes<HTMLLabelElement>, BaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  disableAnimation?: boolean;
  error?: boolean;
  focused?: boolean;
  margin?: 'dense';
  required?: boolean;
  shrink?: boolean;
  size?: 'small' | 'normal';
  variant?: 'standard' | 'outlined' | 'filled';
}

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  autoComplete?: string;
  autoFocus?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  defaultValue?: any;
  disabled?: boolean;
  endAdornment?: ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  inputComponent?: React.ElementType;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  margin?: 'none' | 'dense';
  multiline?: boolean;
  rows?: number | string;
  maxRows?: number | string;
  minRows?: number | string;
  startAdornment?: ReactNode;
}

export interface InputAdornmentProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  disablePointerEvents?: boolean;
  disableTypography?: boolean;
  position: 'start' | 'end';
  variant?: 'standard' | 'outlined' | 'filled';
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  autoComplete?: string;
  autoFocus?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: ReactNode;
  label?: ReactNode;
  margin?: 'none' | 'dense' | 'normal';
  multiline?: boolean;
  rows?: number | string;
  maxRows?: number | string;
  minRows?: number | string;
  select?: boolean;
  size?: 'small' | 'medium';
  type?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  InputProps?: Partial<InputBaseProps>;
  InputLabelProps?: Partial<InputLabelProps>;
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  SelectProps?: Partial<SelectProps>;
}

export interface SelectProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  autoWidth?: boolean;
  defaultOpen?: boolean;
  defaultValue?: any;
  displayEmpty?: boolean;
  label?: ReactNode;
  labelId?: string;
  multiple?: boolean;
  native?: boolean;
  open?: boolean;
  renderValue?: (value: any) => ReactNode;
  value?: any;
  variant?: 'standard' | 'outlined' | 'filled';
  MenuProps?: Partial<MenuProps>;
  onChange?: (event: any) => void;
}

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  checked?: boolean;
  checkedIcon?: ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  edge?: 'start' | 'end' | false;
  icon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  size?: 'small' | 'medium';
  value?: any;
  slotProps?: {
    input?: InputHTMLAttributes<HTMLInputElement>;
    [key: string]: any;
  };
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  checked?: boolean;
  checkedIcon?: ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  icon?: ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  size?: 'small' | 'medium';
  value?: any;
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  checked?: boolean;
  checkedIcon?: ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default';
  disabled?: boolean;
  disableRipple?: boolean;
  icon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  size?: 'small' | 'medium';
  value?: any;
}

// ----------------------------------------------------------------------
// Data Display
// ----------------------------------------------------------------------

export interface AvatarProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  alt?: string;
  src?: string;
  srcSet?: string;
  sizes?: string;
  variant?: 'circular' | 'rounded' | 'square';
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  anchorOrigin?: {
    horizontal: 'left' | 'right';
    vertical: 'top' | 'bottom';
  };
  badgeContent?: ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  invisible?: boolean;
  max?: number;
  overlap?: 'rectangular' | 'circular';
  showZero?: boolean;
  variant?: 'standard' | 'dot';
}

export interface ChipProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  avatar?: ReactNode;
  clickable?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  deleteIcon?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  onDelete?: (event: any) => void;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
}

export interface DividerProps extends HTMLAttributes<HTMLHRElement>, BaseProps {
  absolute?: boolean;
  flexItem?: boolean;
  light?: boolean;
  orientation?: 'horizontal' | 'vertical';
  textAlign?: 'center' | 'left' | 'right';
  variant?: 'fullWidth' | 'inset' | 'middle';
}

export interface TooltipProps extends BaseProps {
  arrow?: boolean;
  children: React.ReactElement;
  describeChild?: boolean;
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableInteractive?: boolean;
  disableTouchListener?: boolean;
  enterDelay?: number;
  enterNextDelay?: number;
  enterTouchDelay?: number;
  followCursor?: boolean;
  leaveDelay?: number;
  leaveTouchDelay?: number;
  open?: boolean;
  placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
  title: ReactNode;
  TransitionComponent?: React.ComponentType;
  TransitionProps?: object;
  onClose?: (event: React.SyntheticEvent) => void;
  onOpen?: (event: React.SyntheticEvent) => void;
}

export interface ListItemTextProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: ReactNode;
  primaryTypographyProps?: Partial<TypographyProps>;
  secondary?: ReactNode;
  secondaryTypographyProps?: Partial<TypographyProps>;
}

// ----------------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------------

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement>, BaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | string;
  component?: React.ElementType;
  href?: string;
  underline?: 'none' | 'hover' | 'always';
  variant?: TypographyProps['variant'];
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  allowScrollButtonsMobile?: boolean;
  centered?: boolean;
  indicatorColor?: 'primary' | 'secondary';
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  orientation?: 'horizontal' | 'vertical';
  scrollButtons?: 'auto' | true | false;
  selectionFollowsFocus?: boolean;
  TabIndicatorProps?: object;
  TabScrollButtonProps?: object;
  textColor?: 'inherit' | 'primary' | 'secondary';
  value?: any;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  visibleScrollbar?: boolean;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end' | 'top' | 'bottom';
  label?: ReactNode;
  value?: any;
  wrapped?: boolean;
}

export interface PaginationProps extends HTMLAttributes<HTMLElement>, BaseProps {
  boundaryCount?: number;
  color?: 'primary' | 'secondary' | 'standard';
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  page?: number;
  renderItem?: (params: any) => ReactNode;
  shape?: 'circular' | 'rounded';
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'text';
}

// ----------------------------------------------------------------------
// Feedback
// ----------------------------------------------------------------------

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  action?: ReactNode;
  closeText?: string;
  color?: 'error' | 'info' | 'success' | 'warning';
  icon?: ReactNode | false;
  iconMapping?: Record<string, ReactNode>;
  onClose?: (event: React.SyntheticEvent) => void;
  severity?: 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined' | 'standard';
}

export interface DialogProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  disableEscapeKeyDown?: boolean;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  onClose?: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void;
  open: boolean;
  scroll?: 'body' | 'paper';
  TransitionComponent?: React.ComponentType;
  TransitionProps?: object;
}

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  action?: ReactNode;
  anchorOrigin?: {
    horizontal: 'center' | 'left' | 'right';
    vertical: 'bottom' | 'top';
  };
  autoHideDuration?: number;
  ClickAwayListenerProps?: object;
  ContentProps?: object;
  disableWindowBlurListener?: boolean;
  message?: ReactNode;
  onClose?: (event: React.SyntheticEvent | Event, reason: string) => void;
  open?: boolean;
  resumeHideDuration?: number;
  TransitionComponent?: React.ComponentType;
  transitionDuration?: number | { appear?: number; enter?: number; exit?: number };
  TransitionProps?: object;
}

export interface LinearProgressProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  value?: number;
  valueBuffer?: number;
  variant?: 'buffer' | 'determinate' | 'indeterminate' | 'query';
}

export interface CircularProgressProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  disableShrink?: boolean;
  size?: number | string;
  thickness?: number;
  value?: number;
  variant?: 'determinate' | 'indeterminate';
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
  animation?: 'pulse' | 'wave' | false;
  height?: number | string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: number | string;
}

// ----------------------------------------------------------------------
// Surfaces
// ----------------------------------------------------------------------

export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  raised?: boolean;
  elevation?: number;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  action?: ReactNode;
  avatar?: ReactNode;
  disableTypography?: boolean;
  subheader?: ReactNode;
  subheaderTypographyProps?: Partial<TypographyProps>;
  title?: ReactNode;
  titleTypographyProps?: Partial<TypographyProps>;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  component?: React.ElementType;
}

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  disableSpacing?: boolean;
}

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  component?: React.ElementType;
  image?: string;
  src?: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  defaultExpanded?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  square?: boolean;
  TransitionComponent?: React.ComponentType;
  TransitionProps?: object;
}

// ----------------------------------------------------------------------
// Utils
// ----------------------------------------------------------------------

export interface CollapseProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  collapsedSize?: number | string;
  component?: React.ElementType;
  easing?: string | { enter?: string; exit?: string };
  in?: boolean;
  orientation?: 'horizontal' | 'vertical';
  timeout?: number | 'auto' | { appear?: number; enter?: number; exit?: number };
  unmountOnExit?: boolean;
}

export interface DrawerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  elevation?: number;
  hideBackdrop?: boolean;
  ModalProps?: object;
  onClose?: (event: object) => void;
  open?: boolean;
  PaperProps?: Partial<PaperProps>;
  SlideProps?: object;
  transitionDuration?: number | { appear?: number; enter?: number; exit?: number };
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export interface PopoverProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  action?: React.Ref<any>;
  anchorEl?: Element | ((element: Element) => Element) | null;
  anchorOrigin?: {
    horizontal: 'center' | 'left' | 'right' | number;
    vertical: 'bottom' | 'center' | 'top' | number;
  };
  anchorPosition?: { left: number; top: number };
  anchorReference?: 'anchorEl' | 'anchorPosition' | 'none';
  container?: Element | (() => Element) | null;
  disableScrollLock?: boolean;
  elevation?: number;
  marginThreshold?: number;
  onClose?: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void;
  open: boolean;
  PaperProps?: Partial<PaperProps>;
  slotProps?: object;
  slots?: object;
  transformOrigin?: {
    horizontal: 'center' | 'left' | 'right' | number;
    vertical: 'bottom' | 'center' | 'top' | number;
  };
  TransitionComponent?: React.ComponentType;
  transitionDuration?: number | 'auto' | { appear?: number; enter?: number; exit?: number };
  TransitionProps?: object;
}

export interface MenuProps extends PopoverProps {
  autoFocus?: boolean;
  disableAutoFocusItem?: boolean;
  MenuListProps?: Partial<MenuListProps>;
  variant?: 'menu' | 'selectedMenu';
}

export interface MenuListProps extends HTMLAttributes<HTMLUListElement>, BaseProps {
  autoFocus?: boolean;
  autoFocusItem?: boolean;
  disabledItemsFocusable?: boolean;
  disableListWrap?: boolean;
  variant?: 'menu' | 'selectedMenu';
}

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement>, BaseProps {
  autoFocus?: boolean;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  selected?: boolean;
}

// ----------------------------------------------------------------------
// Table
// ----------------------------------------------------------------------

export interface TableProps extends HTMLAttributes<HTMLTableElement>, BaseProps {
  padding?: 'checkbox' | 'none' | 'normal';
  size?: 'medium' | 'small';
  stickyHeader?: boolean;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement>, BaseProps {}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement>, BaseProps {}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement>, BaseProps {
  hover?: boolean;
  selected?: boolean;
}

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement>, BaseProps {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  component?: React.ElementType;
  padding?: 'checkbox' | 'none' | 'normal';
  scope?: string;
  size?: 'medium' | 'small';
  sortDirection?: 'asc' | 'desc' | false;
  variant?: 'body' | 'footer' | 'head';
}

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  component?: React.ElementType;
}

export interface TablePaginationProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  count: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
  ActionsComponent?: React.ComponentType<any>;
  backIconButtonProps?: Partial<IconButtonProps>;
  getItemAriaLabel?: (type: 'first' | 'last' | 'next' | 'previous') => string;
  labelDisplayedRows?: (paginationInfo: { from: number; to: number; count: number; page: number }) => ReactNode;
  labelRowsPerPage?: ReactNode;
  nextIconButtonProps?: Partial<IconButtonProps>;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  rowsPerPageOptions?: Array<number | { label: string; value: number }>;
  SelectProps?: Partial<SelectProps>;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}

// ----------------------------------------------------------------------
// Autocomplete
// ----------------------------------------------------------------------

export interface AutocompleteProps<T = any> extends BaseProps {
  autoComplete?: boolean;
  autoHighlight?: boolean;
  autoSelect?: boolean;
  blurOnSelect?: 'touch' | 'mouse' | true | false;
  clearIcon?: ReactNode;
  clearOnBlur?: boolean;
  clearOnEscape?: boolean;
  clearText?: string;
  closeText?: string;
  componentsProps?: object;
  defaultValue?: T | T[];
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  disabled?: boolean;
  disabledItemsFocusable?: boolean;
  disableListWrap?: boolean;
  disablePortal?: boolean;
  filterOptions?: (options: T[], state: any) => T[];
  filterSelectedOptions?: boolean;
  forcePopupIcon?: 'auto' | boolean;
  freeSolo?: boolean;
  fullWidth?: boolean;
  getLimitTagsText?: (more: number) => ReactNode;
  getOptionDisabled?: (option: T) => boolean;
  getOptionLabel?: (option: T) => string;
  groupBy?: (option: T) => string;
  handleHomeEndKeys?: boolean;
  id?: string;
  includeInputInList?: boolean;
  inputValue?: string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  limitTags?: number;
  ListboxComponent?: React.ComponentType;
  ListboxProps?: object;
  loading?: boolean;
  loadingText?: ReactNode;
  multiple?: boolean;
  noOptionsText?: ReactNode;
  onChange?: (event: React.SyntheticEvent, value: T | T[] | null, reason: string, details?: any) => void;
  onClose?: (event: React.SyntheticEvent, reason: string) => void;
  onHighlightChange?: (event: React.SyntheticEvent, option: T | null, reason: string) => void;
  onInputChange?: (event: React.SyntheticEvent, value: string, reason: string) => void;
  onOpen?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  openOnFocus?: boolean;
  openText?: string;
  options: readonly T[];
  PaperComponent?: React.ComponentType;
  PopperComponent?: React.ComponentType;
  popupIcon?: ReactNode;
  readOnly?: boolean;
  renderGroup?: (params: any) => ReactNode;
  renderInput: (params: any) => ReactNode;
  renderOption?: (props: any, option: T, state: any) => ReactNode;
  renderTags?: (value: T[], getTagProps: any, ownerState: any) => ReactNode;
  selectOnFocus?: boolean;
  size?: 'small' | 'medium';
  slotProps?: object;
  value?: T | T[] | null;
}

// ----------------------------------------------------------------------
// Theme Types
// ----------------------------------------------------------------------

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BreakpointValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type Direction = 'ltr' | 'rtl';

export type ColorMode = 'light' | 'dark';

// ----------------------------------------------------------------------
// Upload Types
// ----------------------------------------------------------------------

export interface UploadProps extends BaseProps {
  accept?: Record<string, string[]>;
  disabled?: boolean;
  error?: boolean;
  file?: File | string | null;
  files?: (File | string)[];
  helperText?: ReactNode;
  maxSize?: number;
  multiple?: boolean;
  onDelete?: (file: File | string) => void;
  onDrop?: (acceptedFiles: File[]) => void;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
  placeholder?: ReactNode;
  thumbnail?: boolean;
}
