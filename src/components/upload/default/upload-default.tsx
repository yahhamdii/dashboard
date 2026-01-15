import type { UploadProps } from '../types';

import { useDropzone } from 'react-dropzone';
import { mergeClasses } from 'minimal-shared/utils';

// import { BoxWrapper as Box } from 'src/components/circuit-ui';

import { ButtonWrapper as Button } from 'src/components/circuit-ui';
import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { UploadIllustration } from 'src/assets/illustrations';

import { Iconify } from '../../iconify';
import { uploadClasses } from '../classes';
import { RejectedFiles } from '../components/rejected-files';
import { MultiFilePreview } from '../components/multi-file-preview';
import { SingleFilePreview } from '../components/single-file-preview';
// import { UploadArea, DeleteButton, UploadWrapper, PlaceholderContainer } from './styles';
import '../upload.css';

// ----------------------------------------------------------------------

export function Upload({
  sx,
  value,
  error,
  disabled,
  onDelete,
  onUpload,
  onRemove,
  className,
  helperText,
  onRemoveAll,
  slotProps,
  loading = false,
  multiple = false,
  hideFilesRejected = false,
  previewOrientation = 'horizontal',
  ...dropzoneOptions
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...dropzoneOptions,
  });

  const isSingleFileSelected = !multiple && !!value && !Array.isArray(value);
  const hasMultiFilesSelected = multiple && Array.isArray(value) && value.length > 0;
  const hasError = isDragReject || !!error;
  const showFilesRejected = !hideFilesRejected && fileRejections.length > 0;

  const renderPlaceholder = () => (
    <div className={`placeholder-container ${uploadClasses.placeholder.root}`}>
      <UploadIllustration hideBackground sx={{ width: 200 }} />
      <div className={`placeholder-content ${uploadClasses.placeholder.content}`}>
        <div className={`placeholder-title ${uploadClasses.placeholder.title}`}>
          {multiple ? 'Drop or select files' : 'Drop or select a file'}
        </div>
        <div className={`placeholder-description ${uploadClasses.placeholder.description}`}>
          {multiple ? 'Drag files here' : 'Drag a file here'}, or <span>browse</span> your device.
        </div>
      </div>
    </div>
  );

  const renderSingleFileLoading = () =>
    loading &&
    !multiple && (
      <div className="upload-spinner upload-spinner-single">
        <svg width="26" height="26" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
        </svg>
      </div>
    );

  const renderSingleFilePreview = () => isSingleFileSelected && <SingleFilePreview file={value} />;

  const renderMultiFilesPreview = () =>
    hasMultiFilesSelected && (
      <>
        <div style={{ margin: '24px 0' }}>
          <MultiFilePreview
            files={value}
            onRemove={onRemove}
            orientation={previewOrientation}
            {...slotProps?.multiPreview}
          />
        </div>

        {(onRemoveAll || onUpload) && (
          <div style={{ gap: '12px', display: 'flex', justifyContent: 'flex-end' }}>
            {onRemoveAll && (
              <Button size="small" variant="outlined" color="inherit" onClick={onRemoveAll}>
                Remove All
              </Button>
            )}
            {onUpload && (
              <Button
                size="small"
                variant="contained"
                onClick={onUpload}
                startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                loading={loading && multiple}
                loadingPosition="start"
              >
                {loading && multiple ? 'Uploading...' : 'Upload'}
              </Button>
            )}
          </div>
        )}
      </>
    );

  const rootStyles = sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {};

  return (
    <div {...slotProps?.wrapper} className={`upload-wrapper ${uploadClasses.wrapper}`} style={rootStyles}>
      <div
        {...getRootProps()}
        className={mergeClasses(['upload-area', uploadClasses.default, className], {
          'upload-state-drag-active': isDragActive,
          'upload-state-disabled': disabled,
          'upload-state-error': hasError,
          [uploadClasses.state.dragActive]: isDragActive,
          [uploadClasses.state.disabled]: disabled,
          [uploadClasses.state.error]: hasError,
        })}
      >
        <input {...getInputProps()} />
        {isSingleFileSelected ? renderSingleFilePreview() : renderPlaceholder()}
      </div>

      {isSingleFileSelected && (
        <button type="button" className="delete-button" onClick={onDelete}>
          <Iconify icon="mingcute:close-line" width={16} />
        </button>
      )}

      {helperText && (
        <Typography variant="caption" style={{ color: error ? 'var(--cui-fg-danger)' : 'inherit', marginTop: '8px', display: 'block' }}>
          {helperText}
        </Typography>
      )}
      {showFilesRejected && <RejectedFiles files={fileRejections} {...slotProps?.rejectedFiles} />}

      {renderSingleFileLoading()}
      {renderMultiFilesPreview()}
    </div>
  );
}
