import type { IUserProfileFriend } from 'src/types/user';

import { usePopover } from 'minimal-shared/hooks';

import {
  BoxWrapper as Box,
  LinkWrapper as Link,
  CardWrapper as Card,
  AvatarWrapper,
  IconButtonWrapper,
  MenuListWrapper as MenuList,
  MenuItemWrapper as MenuItem,
  InputAdornmentWrapper as InputAdornment,
  InputWrapper as TextField,
  TypographyWrapper as Typography
} from 'src/components/circuit-ui';
import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { _socials } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  searchFriends: string;
  friends: IUserProfileFriend[];
  onSearchFriends: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ProfileFriends({ friends, searchFriends, onSearchFriends }: Props) {
  const dataFiltered = applyFilter({ inputData: friends, query: searchFriends });

  const notFound = !dataFiltered.length && !!searchFriends;

  const useCircuit = useCircuitLayoutsWithPathname();

  return (
    <>
      {useCircuit ? (
        <div className="flex flex-col sm:flex-row gap-2 my-5 justify-between">
          <Typography variant="h4">Friends</Typography>
          <TextField
            value={searchFriends}
            onChange={onSearchFriends}
            placeholder="Search friends..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { xs: 1, sm: 260 } }}
          />
        </div>
      ) : (
        <Box
          sx={{
            my: 5,
            gap: 2,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="h4">Friends</Typography>

          <TextField
            value={searchFriends}
            onChange={onSearchFriends}
            placeholder="Search friends..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { xs: 1, sm: 260 } }}
          />
        </Box>
      )}

      {notFound ? (
        <SearchNotFound query={searchFriends} sx={{ py: 10 }} />
      ) : useCircuit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {dataFiltered.map((item) => (
            <FriendCard key={item.id} item={item} />
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
            },
          }}
        >
          {dataFiltered.map((item) => (
            <FriendCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type FriendCardProps = {
  item: IUserProfileFriend;
};

function FriendCard({ item }: FriendCardProps) {
  const menuActions = usePopover();

  const handleDelete = () => {
    menuActions.onClose();
    console.info('DELETE', item.name);
  };

  const handleEdit = () => {
    menuActions.onClose();
    console.info('EDIT', item.name);
  };

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <AvatarWrapper alt={item.name} src={item.avatarUrl} size="large" sx={{ width: 64, height: 64, mb: 3 }} />

        <Link variant="subtitle1" color="text.primary">
          {item.name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
          {item.role}
        </Typography>

        {useCircuitLayoutsWithPathname() ? (
          <div className="flex items-center justify-center">
            {_socials.map((social) => (
              <IconButtonWrapper key={social.label}>
                {social.value === 'twitter' && <Iconify icon="socials:twitter" />}
                {social.value === 'facebook' && <Iconify icon="socials:facebook" />}
                {social.value === 'instagram' && <Iconify icon="socials:instagram" />}
                {social.value === 'linkedin' && <Iconify icon="socials:linkedin" />}
              </IconButtonWrapper>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {_socials.map((social) => (
              <IconButtonWrapper key={social.label}>
                {social.value === 'twitter' && <Iconify icon="socials:twitter" />}
                {social.value === 'facebook' && <Iconify icon="socials:facebook" />}
                {social.value === 'instagram' && <Iconify icon="socials:instagram" />}
                {social.value === 'linkedin' && <Iconify icon="socials:linkedin" />}
              </IconButtonWrapper>
            ))}
          </div>
        )}

        <IconButtonWrapper
          color={menuActions.open ? 'inherit' : 'default'}
          onClick={menuActions.onOpen}
          sx={{ top: 8, right: 8, position: 'absolute' }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButtonWrapper>
      </Card>

      {renderMenuActions()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  query: string;
  inputData: IUserProfileFriend[];
};

function applyFilter({ inputData, query }: ApplyFilterProps) {
  if (!query) return inputData;

  return inputData.filter(({ name, role }) =>
    [name, role].some((field) => field?.toLowerCase().includes(query.toLowerCase()))
  );
}
