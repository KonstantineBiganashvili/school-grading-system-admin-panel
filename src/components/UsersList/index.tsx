import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { User } from '../../interfaces-types/user';
import UserRow from './UserRow/index';
import { useEffect } from 'react';
import { getUsersList } from '../../services/api-services/users';
import userSlice from '../../store/user-slice';
import './UsersList.scss';
import Search from '../../layout/Search';
import Filter from './Filter';

const UsersList = () => {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector((state) => state.user.usersList);
  const filteredUsers: User[] = useAppSelector(
    (state) => state.user.filteredUsersList
  );

  useEffect(() => {
    const usersList = async (): Promise<void> => {
      dispatch(userSlice.actions.setUsersList(await getUsersList()));
    };

    usersList();
  }, [dispatch]);

  return (
    <>
      <Box
        style={{
          display: 'flex',
          margin: '80px 0 40px 50px',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Search searchPage="users" />
        <Filter />
      </Box>
      <TableContainer className="list-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Subjects List</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 &&
              users.map((user) => <UserRow key={user.username} user={user} />)}
            {filteredUsers.length > 0 &&
              filteredUsers.map((user) => (
                <UserRow key={user.username} user={user} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersList;
