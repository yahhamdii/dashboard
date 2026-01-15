import type { FileRejection } from 'react-dropzone';

import { mergeClasses } from 'minimal-shared/utils';

// import { tokens } from 'src/theme/design-tokens';

import { fData } from 'src/utils/format-number';

import { uploadClasses } from '../classes';
import { getFileMeta } from '../../file-thumbnail';
import '../upload.css';

// ----------------------------------------------------------------------

export type RejectedFilesProps = React.ComponentProps<'ul'> & { // React.ComponentProps<typeof RejectedList>
  files?: readonly FileRejection[];
  sx?: any;
};

export function RejectedFiles({ files = [], sx, className, ...other }: RejectedFilesProps) {
  const rootStyles = sx && typeof sx === 'object' && !Array.isArray(sx) ? sx : {};

  return (
    <ul
      className={mergeClasses(['rejected-list', uploadClasses.rejected, className])}
      style={rootStyles}
      {...other}
    >
      {files.map(({ file, errors }) => {
        const fileMeta = getFileMeta(file);

        return (
          <li key={fileMeta.key} className="rejected-item">
            <span className="rejected-title">
              {fileMeta.name} - {fileMeta.size ? fData(fileMeta.size) : ''}
            </span>
            {errors.map((error) => (
              <span key={error.code} className="rejected-msg">- {error.message}</span>
            ))}
          </li>
        );
      })}
    </ul>
  );
}

// ----------------------------------------------------------------------

// const RejectedList = styled('ul')(() => ({...}));
// const RejectedItem = styled('li')({...});
// const RejectedTitle = styled('span')(() => ({...}));
// const RejectedMsg = styled('span')(() => ({...}));
