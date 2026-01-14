import type { FileRejection } from 'react-dropzone';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';
import { tokens } from 'src/theme/design-tokens';

import { fData } from 'src/utils/format-number';

import { uploadClasses } from '../classes';
import { getFileMeta } from '../../file-thumbnail';

// ----------------------------------------------------------------------

export type RejectedFilesProps = React.ComponentProps<typeof RejectedList> & {
  files?: readonly FileRejection[];
};

export function RejectedFiles({ files = [], sx, className, ...other }: RejectedFilesProps) {
  return (
    <RejectedList className={mergeClasses([uploadClasses.rejected, className])} sx={sx} {...other}>
      {files.map(({ file, errors }) => {
        const fileMeta = getFileMeta(file);

        return (
          <RejectedItem key={fileMeta.key}>
            <RejectedTitle>
              {fileMeta.name} - {fileMeta.size ? fData(fileMeta.size) : ''}
            </RejectedTitle>
            {errors.map((error) => (
              <RejectedMsg key={error.code}>- {error.message}</RejectedMsg>
            ))}
          </RejectedItem>
        );
      })}
    </RejectedList>
  );
}

// ----------------------------------------------------------------------

const RejectedList = styled('ul')(() => ({
  display: 'flex',
  gap: tokens.spacing(1),
  flexDirection: 'column',
  padding: tokens.spacing(2),
  marginTop: tokens.spacing(3),
  borderRadius: tokens.shape.borderRadius,
  border: `dashed 1px ${tokens.colors.error.main}`,
  backgroundColor: varAlpha(tokens.colors.error.mainChannel, 0.08),
}));

const RejectedItem = styled('li')({
  display: 'flex',
  flexDirection: 'column',
});

const RejectedTitle = styled('span')(() => ({
  ...tokens.typography.subtitle2,
}));

const RejectedMsg = styled('span')(() => ({
  ...tokens.typography.caption,
}));
