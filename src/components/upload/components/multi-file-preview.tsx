import type { UploadProps, FilesUploadType } from '../types';
import type { FileThumbnailProps } from '../../file-thumbnail';

import { mergeClasses, varAlpha } from 'minimal-shared/utils';


import { tokens } from 'src/theme/design-tokens';
import { fData } from 'src/utils/format-number';

import { Iconify } from '../../iconify';
import { uploadClasses } from '../classes';
import { getFileMeta, FileThumbnail, useFilesPreview } from '../../file-thumbnail';
import '../upload.css';

// ----------------------------------------------------------------------

export type PreviewOrientation = 'horizontal' | 'vertical';

export type MultiFilePreviewProps = React.ComponentProps<'ul'> & // React.ComponentProps<typeof PreviewList> &
  Pick<UploadProps, 'onRemove'> & {
    files: FilesUploadType;
    startNode?: React.ReactNode;
    endNode?: React.ReactNode;
    orientation?: PreviewOrientation;
    thumbnail?: Omit<FileThumbnailProps, 'file'>;
    sx?: any;
  };

export function MultiFilePreview({
  sx,
  onRemove,
  className,
  endNode,
  startNode,
  files = [],
  orientation = 'horizontal',
  thumbnail: thumbnailProps,
  ...other
}: MultiFilePreviewProps) {
  const { filesPreview } = useFilesPreview(files);

  const renderList = () =>
    filesPreview.map(({ file, previewUrl }) => {
      const fileMeta = getFileMeta(file);

      const commonProps: FileThumbnailProps = {
        file,
        previewUrl,
        ...thumbnailProps,
      };

      if (orientation === 'horizontal') {
        return (
          <li key={fileMeta.key} className="multi-preview-item orientation-horizontal">
            <FileThumbnail
              tooltip
              showImage
              onRemove={() => onRemove?.(file)}
              {...commonProps}
              sx={[
                {
                  width: 80,
                  height: 80,
                  border: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.16)}`,
                },
                ...(Array.isArray(thumbnailProps?.sx) ? thumbnailProps.sx : [thumbnailProps?.sx]),
              ]}
              slotProps={{
                icon: { sx: { width: 36, height: 36 } },
                ...thumbnailProps?.slotProps,
              }}
            />
          </li>
        );
      }

      return (
        <li key={fileMeta.key} className="multi-preview-item orientation-vertical">
          <FileThumbnail {...commonProps} />

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileMeta.name}
            </span>
            {fileMeta.size && (
              <span style={{ fontSize: '0.75rem', color: 'var(--cui-fg-subtle)' }}>
                {fData(fileMeta.size)}
              </span>
            )}
          </div>

          {onRemove && (
            <button type="button" className="preview-remove-btn" onClick={() => onRemove(file)}>
              <Iconify width={16} icon="mingcute:close-line" />
            </button>
          )}
        </li>
      );
    });

  const rootStyles = sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {};

  return (
    <ul
      className={mergeClasses(['multi-preview-list', `orientation-${orientation}`, uploadClasses.preview.multi, className])}
      style={rootStyles}
      {...other}
    >
      {startNode && <li className="multi-preview-slot">{startNode}</li>}
      {renderList()}
      {endNode && <li className="multi-preview-slot">{endNode}</li>}
    </ul>
  );
}

// ----------------------------------------------------------------------

// export const PreviewList = styled('ul', {...})
// const PreviewItem = styled('li', {...})
// const SlotNode = styled('li', {...})
