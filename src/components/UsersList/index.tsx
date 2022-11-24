import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppSelector } from '../../hooks/redux-hooks';
import { User } from '../../interfaces-types/user';
import UserRow from './UserRow/index';

const UsersList = () => {
  const users: User[] = useAppSelector((state) => state.user.usersList);

  return (
    <TableContainer
      style={{
        margin: 'auto',
        marginTop: '50px',
        width: '95%',
      }}
    >
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
          {users.map((user) => (
            <UserRow user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
