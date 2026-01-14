import type { UploadProps, FilesUploadType } from '../types';
import type { FileThumbnailProps } from '../../file-thumbnail';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { tokens } from 'src/theme/design-tokens';
import { fData } from 'src/utils/format-number';

import { Iconify } from '../../iconify';
import { uploadClasses } from '../classes';
import { getFileMeta, FileThumbnail, useFilesPreview } from '../../file-thumbnail';

// ----------------------------------------------------------------------

export type PreviewOrientation = 'horizontal' | 'vertical';

export type MultiFilePreviewProps = React.ComponentProps<typeof PreviewList> &
  Pick<UploadProps, 'onRemove'> & {
    files: FilesUploadType;
    startNode?: React.ReactNode;
    endNode?: React.ReactNode;
    orientation?: PreviewOrientation;
    thumbnail?: Omit<FileThumbnailProps, 'file'>;
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
          <PreviewItem key={fileMeta.key} orientation="horizontal">
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
          </PreviewItem>
        );
      }

      return (
        <PreviewItem key={fileMeta.key} orientation="vertical">
          <FileThumbnail {...commonProps} />

          <ListItemText
            primary={fileMeta.name}
            secondary={fileMeta.size ? fData(fileMeta.size) : ''}
            slotProps={{
              secondary: { sx: { typography: 'caption' } },
            }}
          />

          {onRemove && (
            <IconButton size="small" onClick={() => onRemove(file)}>
              <Iconify width={16} icon="mingcute:close-line" />
            </IconButton>
          )}
        </PreviewItem>
      );
    });

  return (
    <PreviewList
      orientation={orientation}
      className={mergeClasses([uploadClasses.preview.multi, className])}
      sx={sx}
      {...other}
    >
      {startNode && <SlotNode orientation={orientation}>{startNode}</SlotNode>}
      {renderList()}
      {endNode && <SlotNode orientation={orientation}>{endNode}</SlotNode>}
    </PreviewList>
  );
}

// ----------------------------------------------------------------------

export const PreviewList = styled('ul', {
  shouldForwardProp: (prop: string) => !['orientation', 'sx'].includes(prop),
})<{ orientation?: PreviewOrientation }>(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing(1),
  variants: [
    {
      props: (props) => props.orientation === 'horizontal',
      style: {
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
    },
  ],
}));

const PreviewItem = styled('li', {
  shouldForwardProp: (prop: string) => !['orientation', 'sx'].includes(prop),
})<{ orientation?: PreviewOrientation }>({
  display: 'inline-flex',
  variants: [
    {
      props: (props) => props.orientation === 'vertical',
      style: () => ({
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing(1.5),
        padding: tokens.spacing(1) + ' ' + tokens.spacing(1) + ' ' + tokens.spacing(1) + ' ' + tokens.spacing(1.5),
        borderRadius: tokens.shape.borderRadius,
        border: `solid 1px ${varAlpha(tokens.colors.grey['500Channel'], 0.16)}`,
      }),
    },
  ],
});

const SlotNode = styled('li', {
  shouldForwardProp: (prop: string) => !['orientation', 'sx'].includes(prop),
})<{ orientation?: PreviewOrientation }>({
  variants: [
    {
      props: (props) => props.orientation === 'horizontal',
      style: {
        width: 'auto',
        display: 'inline-flex',
      },
    },
  ],
});
