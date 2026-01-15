import type { FileUploadType } from '../types';

import { mergeClasses } from 'minimal-shared/utils';

// import { tokens } from 'src/theme/design-tokens';

import { uploadClasses } from '../classes';
import { getFileMeta, useFilePreview } from '../../file-thumbnail';
import '../upload.css';

// ----------------------------------------------------------------------

export type SingleFilePreviewProps = React.ComponentProps<'div'> & {
  file: FileUploadType;
  sx?: any;
};

export function SingleFilePreview({ sx, file, className, ...other }: SingleFilePreviewProps) {
  const fileMeta = getFileMeta(file);
  const { previewUrl } = useFilePreview(file);

  const rootStyles = sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {};

  return (
    <div
      className={mergeClasses(['single-preview-root', uploadClasses.preview.single, className])}
      style={rootStyles}
      {...other}
    >
      {previewUrl && <img alt={fileMeta.name} src={previewUrl} className="single-preview-image" />}
    </div>
  );
}

// ----------------------------------------------------------------------

// const PreviewRoot = styled('div')(() => ({...}));
// const PreviewImage = styled('img')({...});
