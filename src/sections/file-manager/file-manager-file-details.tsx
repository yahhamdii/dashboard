import type { DrawerProps } from '@mui/material/Drawer';
import type { IFile } from 'src/types/file';

import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';

import { InputWrapper as TextField, CheckboxWrapper as Checkbox, IconButtonWrapper } from 'src/components/circuit-ui';

import { TypographyWrapper as Typography, ButtonWrapper as Button } from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { FileThumbnail, detectFileFormat } from 'src/components/file-thumbnail';

import { FileManagerShareDialog } from './file-manager-share-dialog';
import { FileManagerInvitedItem } from './file-manager-invited-item';

// ----------------------------------------------------------------------

type Props = DrawerProps & {
  file: IFile;
  favorited?: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCopyLink: () => void;
  onFavorite?: () => void;
};

export function FileManagerFileDetails({
  file,
  open,
  onClose,
  onDelete,
  favorited,
  onFavorite,
  onCopyLink,
  ...other
}: Props) {
  const shareDialog = useBoolean();
  const showTags = useBoolean(true);
  const showProperties = useBoolean(true);

  const [inviteEmail, setInviteEmail] = useState('');
  const [tags, setTags] = useState(file?.tags.slice(0, 3));

  const hasShared = file?.shared && !!file?.shared.length;

  const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeTags = useCallback((newValue: string[]) => {
    setTags(newValue);
  }, []);

  const renderHead = () => {
    const useCircuit = useCircuitLayoutsWithPathname();
    
    return useCircuit ? (
      <div className="flex items-center p-2.5">
        <Typography variant="h6" className="flex-grow">
          Info
        </Typography>

        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={favorited}
          onChange={onFavorite}
          slotProps={{
            input: {
              id: `favorite-details-${file.id}-checkbox`,
              'aria-label': `Favorite details ${file.id} checkbox`,
            },
          }}
        />
      </div>
    ) : (
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Info
      </Typography>

      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorited}
        onChange={onFavorite}
        slotProps={{
          input: {
            id: `favorite-details-${file.id}-checkbox`,
            'aria-label': `Favorite details ${file.id} checkbox`,
          },
        }}
      />
      </Box>
    );
  };

  const renderProperties = () => {
    const fileDetails = [
      { label: 'Size', value: fData(file?.size) },
      { label: 'Modified', value: fDateTime(file?.modifiedAt) },
      { label: 'Type', value: detectFileFormat(file?.type) },
    ];

    const useCircuit = useCircuitLayoutsWithPathname();
    
    return useCircuit ? (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm">
          Properties
          <IconButtonWrapper size="small" onClick={showProperties.onToggle}>
            <Iconify
              icon={
                showProperties.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'
              }
            />
          </IconButtonWrapper>
        </div>

        {showProperties.value &&
          fileDetails.map((property) => (
            <div key={property.label} className="flex gap-2 text-xs capitalize">
              <span className="w-20 text-gray-500">
                {property.label}
              </span>
              {property.value}
            </div>
          ))}
      </div>
    ) : (
      <Stack spacing={1.5}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            typography: 'subtitle2',
            justifyContent: 'space-between',
          }}
        >
          Properties
          <IconButtonWrapper size="small" onClick={showProperties.onToggle}>
            <Iconify
              icon={
                showProperties.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'
              }
            />
          </IconButtonWrapper>
        </Box>

        {showProperties.value &&
          fileDetails.map((property) => (
            <Box
              key={property.label}
              sx={{ gap: 2, display: 'flex', typography: 'caption', textTransform: 'capitalize' }}
            >
              <Box component="span" sx={{ width: 80, color: 'text.secondary' }}>
                {property.label}
              </Box>
              {property.value}
            </Box>
          ))}
      </Stack>
    );
  };

  const renderTags = () => {
    const useCircuit = useCircuitLayoutsWithPathname();
    
    return useCircuit ? (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm">
          Tags
          <IconButtonWrapper size="small" onClick={showTags.onToggle}>
            <Iconify
              icon={showTags.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </IconButtonWrapper>
        </div>

        {showTags.value && (
          <Autocomplete
            multiple
            freeSolo
            options={file?.tags.map((option) => option)}
            getOptionLabel={(option) => option}
            defaultValue={file?.tags.slice(0, 3)}
            value={tags}
            onChange={(event, newValue) => {
              handleChangeTags(newValue);
            }}
            renderInput={(params) => <TextField {...params} placeholder="#Add a tags" />}
            slotProps={{
              chip: { size: 'small', variant: 'filled' },
            }}
          />
        )}
      </div>
    ) : (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {useCircuitLayoutsWithPathname() ? (
          <div className="flex items-center justify-between text-sm font-medium">
            Tags
            <IconButtonWrapper size="small" onClick={showTags.onToggle}>
              <Iconify
                icon={showTags.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              />
            </IconButtonWrapper>
          </div>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              typography: 'subtitle2',
              justifyContent: 'space-between',
            }}
          >
            Tags
            <IconButtonWrapper size="small" onClick={showTags.onToggle}>
              <Iconify
                icon={showTags.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              />
            </IconButtonWrapper>
          </Box>
        )}

        {showTags.value && (
          <Autocomplete
            multiple
            freeSolo
            options={file?.tags.map((option) => option)}
            getOptionLabel={(option) => option}
            defaultValue={file?.tags.slice(0, 3)}
            value={tags}
            onChange={(event, newValue) => {
              handleChangeTags(newValue);
            }}
            renderInput={(params) => <TextField {...params} placeholder="#Add a tags" />}
            slotProps={{
              chip: { size: 'small', variant: 'filled' },
            }}
          />
        )}
      </Box>
    );
  };

  const renderShared = () => {
    const useCircuit = useCircuitLayoutsWithPathname();
    
    return (
      <>
        {useCircuit ? (
          <div className="flex items-center justify-between p-2.5 text-sm">
            Share with
            <IconButtonWrapper
              size="small"
              color="primary"
              onClick={shareDialog.onTrue}
              sx={{
                width: 24,
                height: 24,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <Iconify width={16} icon="mingcute:add-line" />
            </IconButtonWrapper>
          </div>
        ) : (
          <Box
            sx={{
              p: 2.5,
              display: 'flex',
              alignItems: 'center',
              typography: 'subtitle2',
              justifyContent: 'space-between',
            }}
          >
        Share with
        <IconButtonWrapper
          size="small"
          color="primary"
          onClick={shareDialog.onTrue}
          sx={{
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <Iconify width={16} icon="mingcute:add-line" />
            </IconButtonWrapper>
          </Box>
        )}

          {hasShared && (
          useCircuit ? (
            <ul className="pl-2 pr-1">
              {file?.shared?.map((person) => (
                <FileManagerInvitedItem key={person.id} person={person} />
              ))}
            </ul>
          ) : (
            <Box component="ul" sx={{ pl: 2, pr: 1 }}>
              {file?.shared?.map((person) => (
                <FileManagerInvitedItem key={person.id} person={person} />
              ))}
            </Box>
          )
        )}
      </>
    );
  };

  return (
    <>
      <Drawer
        aria-hidden={!open}
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
          paper: { sx: { width: 320 } },
        }}
        {...other}
      >
        <Scrollbar>
          {renderHead()}

          {useCircuitLayoutsWithPathname() ? (
            <div className="flex flex-col gap-2.5 p-2.5 justify-center bg-gray-100">
              <FileThumbnail
                showImage
                file={file?.type === 'folder' ? file?.type : file?.url}
                sx={{ width: 'auto', height: 'auto', alignSelf: 'flex-start' }}
                slotProps={{
                  img: { sx: { width: 320, height: 'auto', aspectRatio: '4/3', objectFit: 'cover' } },
                  icon: { sx: { width: 64, height: 64 } },
                }}
              />

              <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
                {file?.name}
              </Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {renderTags()}
              {renderProperties()}
            </div>
          ) : (
            <Stack
              spacing={2.5}
              sx={{ p: 2.5, justifyContent: 'center', bgcolor: 'background.neutral' }}
            >
              <FileThumbnail
                showImage
                file={file?.type === 'folder' ? file?.type : file?.url}
                sx={{ width: 'auto', height: 'auto', alignSelf: 'flex-start' }}
                slotProps={{
                  img: { sx: { width: 320, height: 'auto', aspectRatio: '4/3', objectFit: 'cover' } },
                  icon: { sx: { width: 64, height: 64 } },
                }}
              />

              <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
                {file?.name}
              </Typography>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {renderTags()}
              {renderProperties()}
            </Stack>
          )}

          {renderShared()}
        </Scrollbar>

        {useCircuitLayoutsWithPathname() ? (
          <div className="p-2.5">
            <Button
              fullWidth
              variant="soft"
              color="error"
              size="large"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Box sx={{ p: 2.5 }}>
            <Button
              fullWidth
              variant="soft"
              color="error"
              size="large"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </Drawer>

      <FileManagerShareDialog
        open={shareDialog.value}
        shared={file?.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={onCopyLink}
        onClose={() => {
          shareDialog.onFalse();
          setInviteEmail('');
        }}
      />
    </>
  );
}
