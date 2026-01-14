import type { UploadProps } from '../types';

import { useDropzone } from 'react-dropzone';
import { mergeClasses } from 'minimal-shared/utils';

import { Iconify } from '../../iconify';
import { uploadClasses } from '../classes';
// import { UploadArea } from './styles';
import '../upload.css';

// ----------------------------------------------------------------------

export function UploadBox({
  sx,
  error,
  disabled,
  className,
  placeholder,
  ...dropzoneOptions
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...dropzoneOptions,
  });

  const hasError = isDragReject || !!error;

  const rootStyles = sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {};

  return (
    <div
      {...getRootProps()}
      className={mergeClasses(['upload-area', uploadClasses.box, className], {
        'upload-state-drag-active': isDragActive,
        'upload-state-disabled': disabled,
        'upload-state-error': hasError,
        [uploadClasses.state.dragActive]: isDragActive,
        [uploadClasses.state.disabled]: disabled,
        [uploadClasses.state.error]: hasError,
      })}
      style={rootStyles}
    >
      <input {...getInputProps()} />
      {placeholder ?? <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </div>
  );
}
