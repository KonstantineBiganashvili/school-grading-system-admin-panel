import { Button, MenuItem, Select, TableCell, TableRow } from '@mui/material';
import { UserRowInterface } from '../../../interfaces-types/props';
import { useDispatch } from 'react-redux';
import rolesSlice from '../../../store/roles-slice';
import userSlice from '../../../store/user-slice';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { Role } from '../../../interfaces-types/roles-list';
import { getRoles } from '../../../services/api-services/roles';
import { getUsersList } from '../../../services/api-services/users';
import { useEffect } from 'react';

const UserRow = (props: UserRowInterface) => {
  const { user } = props;

  const dispatch = useDispatch();

  const getRole = (id: number): string => {
    const assignedRole = roles.find((role) => role.id === id);

    return assignedRole ? assignedRole.role : 'No Assigned Role';
  };

  const roles: Role[] = useAppSelector((state) => state.roles.rolesList);

  useEffect(() => {
    const usersList = async () => {
      dispatch(rolesSlice.actions.setRoles(await getRoles()));
      dispatch(userSlice.actions.setUsersList(await getUsersList()));
    };

    usersList();
  }, [dispatch]);

  const getSubjects = (subArray: any) =>
    subArray.map((subject: any) => (
      <MenuItem
        value={subject.name}
        key={subject.name}
        disabled
        style={{
          opacity: 1,
        }}
      >
        {subject.name}
      </MenuItem>
    ));

  return (
    <TableRow key={user.username}>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{getRole(user.role_id)}</TableCell>
      <TableCell>
        {user.subjects?.length ? (
          <Select value="0" style={{ width: '100%' }}>
            <MenuItem value="0" style={{ display: 'none' }}>
              Subjects List
            </MenuItem>
            {getSubjects(user.subjects)}
          </Select>
        ) : (
          <Select value={'0'} disabled style={{ width: '100%' }}>
            <MenuItem value={'0'}>No Subjects Available</MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Button variant="contained">Details</Button>
        <Button variant="contained" color="warning">
          Edit
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
