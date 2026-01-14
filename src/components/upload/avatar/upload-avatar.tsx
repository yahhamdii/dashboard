import type { UploadProps } from '../types';

import { useDropzone } from 'react-dropzone';
import { mergeClasses } from 'minimal-shared/utils';

// import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';
import { TypographyWrapper as Typography } from 'src/components/circuit-ui';

import { uploadClasses } from '../classes';
import { RejectedFiles } from '../components/rejected-files';
import { getFileMeta, useFilePreview } from '../../file-thumbnail';
// import {
//   UploadArea,
//   PreviewImage,
//   UploadContent,
//   UploadWrapper,
//   PlaceholderContainer,
// } from './styles';
import '../upload.css';

// ----------------------------------------------------------------------

export function UploadAvatar({
  sx,
  error,
  value,
  disabled,
  className,
  slotProps,
  helperText,
  loading = false,
  hideFilesRejected = false,
  ...dropzoneOptions
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    disabled,
    multiple: false,
    accept: { 'image/*': [] },
    ...dropzoneOptions,
  });

  const file = !Array.isArray(value) ? value : null;
  const hasSelectedFile = !!file;
  const hasError = isDragReject || !!error;
  const showFilesRejected = !hideFilesRejected && fileRejections.length > 0;

  const fileMeta = getFileMeta(file);
  const { previewUrl } = useFilePreview(file);

  const renderPlaceholder = () => (
    <div className={`placeholder-container placeholder-root ${uploadClasses.placeholder.root}`}>
      <Iconify icon="solar:camera-add-bold" width={32} className={uploadClasses.placeholder.icon} />
      <Typography variant="caption" className={uploadClasses.placeholder.title}>
        {hasSelectedFile ? 'Update photo' : 'Upload photo'}
      </Typography>
    </div>
  );

  const renderLoading = () =>
    loading && (
      <div className="upload-spinner upload-spinner-avatar">
        <svg width="40" height="40" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
        </svg>
      </div>
    );

  const renderPreview = () =>
    hasSelectedFile && previewUrl && <img alt={fileMeta.name} src={previewUrl} className="preview-image" />;

  const rootStyles = sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {};

  return (
    <div {...slotProps?.wrapper} className={`upload-wrapper ${uploadClasses.wrapper}`} style={rootStyles}>
      <div
        {...getRootProps()}
        className={mergeClasses(['upload-area', 'upload-avatar', uploadClasses.avatar, className], {
          'upload-state-drag-active': isDragActive,
          'upload-state-disabled': disabled,
          'upload-state-error': hasError,
          'upload-state-has-file': hasSelectedFile,
          [uploadClasses.state.dragActive]: isDragActive,
          [uploadClasses.state.disabled]: disabled,
          [uploadClasses.state.error]: hasError,
          [uploadClasses.state.hasFile]: hasSelectedFile,
        })}
      >
        <input {...getInputProps()} />
        <div className="upload-content">
          {renderPreview()}
          {renderPlaceholder()}
        </div>
        {renderLoading()}
      </div>

      {helperText && helperText}
      {showFilesRejected && <RejectedFiles files={fileRejections} {...slotProps?.rejectedFiles} />}
    </div>
  );
}
