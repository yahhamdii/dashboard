import type { IFile } from 'src/types/file';
import type { UseTableReturn } from 'src/components/table';

import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useState, useCallback } from 'react';

import {
  BoxWrapper as Box,
  DividerWrapper as Divider,
  CollapseWrapper as Collapse,
  ButtonWrapper as Button
} from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { Iconify } from 'src/components/iconify';

import { FileManagerPanel } from './file-manager-panel';
import { FileManagerFileItem } from './file-manager-file-item';
import { FileManagerFolderItem } from './file-manager-folder-item';
import { FileManagerShareDialog } from './file-manager-share-dialog';
import { FileManagerActionSelected } from './file-manager-action-selected';
import { FileManagerCreateFolderDialog } from './file-manager-create-folder-dialog';

// ----------------------------------------------------------------------

type Props = {
  table: UseTableReturn;
  dataFiltered: IFile[];
  onOpenConfirm: () => void;
  onDeleteItem: (id: string) => void;
};

export function FileManagerGridView({ table, dataFiltered, onDeleteItem, onOpenConfirm }: Props) {
  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const shareDialog = useBoolean();
  const filesCollapse = useBoolean();
  const foldersCollapse = useBoolean();

  const newFilesDialog = useBoolean();
  const newFolderDialog = useBoolean();

  const [folderName, setFolderName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  }, []);

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onClose={() => {
        shareDialog.onFalse();
        setInviteEmail('');
      }}
    />
  );

  const renderUploadFilesDialog = () => (
    <FileManagerCreateFolderDialog open={newFilesDialog.value} onClose={newFilesDialog.onFalse} />
  );

  const renderCreateFolderDialog = () => (
    <FileManagerCreateFolderDialog
      open={newFolderDialog.value}
      onClose={newFolderDialog.onFalse}
      title="Add folder"
      onCreate={() => {
        newFolderDialog.onFalse();
        setFolderName('');
        console.info('CREATE NEW FOLDER', folderName);
      }}
      folderName={folderName}
      onChangeFolderName={handleChangeFolderName}
    />
  );

  const renderFolders = () => (
    <>
      <FileManagerPanel
        title="Folders"
        subtitle={`${dataFiltered.filter((item) => item.type === 'folder').length} folders`}
        onOpen={newFolderDialog.onTrue}
        collapse={foldersCollapse.value}
        onCollapse={foldersCollapse.onToggle}
      />

      <Collapse in={!foldersCollapse.value} unmountOnExit>
        {useCircuitLayoutsWithPathname() ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {dataFiltered
              .filter((i) => i.type === 'folder')
              .map((folder) => (
                <FileManagerFolderItem
                  key={folder.id}
                  folder={folder}
                  selected={selected.includes(folder.id)}
                  onSelect={() => onSelectItem(folder.id)}
                  onDelete={() => onDeleteItem(folder.id)}
                />
              ))}
          </div>
        ) : (
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {dataFiltered
              .filter((i) => i.type === 'folder')
              .map((folder) => (
                <FileManagerFolderItem
                  key={folder.id}
                  folder={folder}
                  selected={selected.includes(folder.id)}
                  onSelect={() => onSelectItem(folder.id)}
                  onDelete={() => onDeleteItem(folder.id)}
                />
              ))}
          </Box>
        )}
      </Collapse>
    </>
  );

  const renderFiles = () => (
    <>
      <FileManagerPanel
        title="Files"
        subtitle={`${dataFiltered.filter((item) => item.type !== 'folder').length} files`}
        onOpen={newFilesDialog.onTrue}
        collapse={filesCollapse.value}
        onCollapse={filesCollapse.onToggle}
      />

      <Collapse in={!filesCollapse.value} unmountOnExit>
        {useCircuitLayoutsWithPathname() ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {dataFiltered
              .filter((i) => i.type !== 'folder')
              .map((file) => (
                <FileManagerFileItem
                  key={file.id}
                  file={file}
                  selected={selected.includes(file.id)}
                  onSelect={() => onSelectItem(file.id)}
                  onDelete={() => onDeleteItem(file.id)}
                />
              ))}
          </div>
        ) : (
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {dataFiltered
              .filter((i) => i.type !== 'folder')
              .map((file) => (
                <FileManagerFileItem
                  key={file.id}
                  file={file}
                  selected={selected.includes(file.id)}
                  onSelect={() => onSelectItem(file.id)}
                  onDelete={() => onDeleteItem(file.id)}
                />
              ))}
          </Box>
        )}
      </Collapse>
    </>
  );

  const renderSelectedActions = () =>
    !!selected?.length && (
      <FileManagerActionSelected
        numSelected={selected.length}
        rowCount={dataFiltered.length}
        selected={selected}
        onSelectAllItems={(checked) =>
          onSelectAllItems(
            checked,
            dataFiltered.map((row) => row.id)
          )
        }
        action={
          <>
            <Button
              size="small"
              color="error"
              variant="contained"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirm}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>

            <Button
              color="primary"
              size="small"
              variant="contained"
              startIcon={<Iconify icon="solar:share-bold" />}
              onClick={shareDialog.onTrue}
            >
              Share
            </Button>
          </>
        }
      />
    );

  const useCircuit = useCircuitLayoutsWithPathname();

  return (
    <>
      {useCircuit ? (
        <div ref={containerRef}>
          {renderFolders()}
          <Divider sx={{ my: 5, borderStyle: 'dashed' }} />
          {renderFiles()}
          {renderSelectedActions()}
        </div>
      ) : (
        <Box ref={containerRef}>
          {renderFolders()}
          <Divider sx={{ my: 5, borderStyle: 'dashed' }} />
          {renderFiles()}
          {renderSelectedActions()}
        </Box>
      )}

      {renderShareDialog()}
      {renderUploadFilesDialog()}
      {renderCreateFolderDialog()}
    </>
  );
}
