import type { IUserCard } from 'src/types/user';

import { useState, useCallback } from 'react';

import { BoxWrapper as Box } from 'src/components/circuit-ui';
import Pagination from '@mui/material/Pagination';

import { useCircuitLayoutsWithPathname } from 'src/lib/feature-flags';

import { UserCard } from './user-card';

// ----------------------------------------------------------------------

type Props = {
  users: IUserCard[];
};

export function UserCardList({ users }: Props) {
  const [page, setPage] = useState(1);

  const rowsPerPage = 12;

  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  }, []);

  const useCircuit = useCircuitLayoutsWithPathname();

  return (
    <>
      {useCircuit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {users
            .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
            .map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
        </div>
      ) : (
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {users
            .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
            .map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
        </Box>
      )}

      <Pagination
        page={page}
        shape="circular"
        count={Math.ceil(users.length / rowsPerPage)}
        onChange={handleChangePage}
        sx={{ mt: { xs: 5, md: 8 }, mx: 'auto' }}
      />
    </>
  );
}
