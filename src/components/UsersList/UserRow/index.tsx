import { MenuItem, Select, TableCell, TableRow } from '@mui/material';
import { UserRowInterface } from '../../../interfaces-types/props';
import { useDispatch } from 'react-redux';
import rolesSlice from '../../../store/roles-slice';
import userSlice from '../../../store/user-slice';
import { useAppSelector } from '../../../hooks/redux-hooks';
import { Role } from '../../../interfaces-types/roles-list';
import { getRoles } from '../../../services/api-services/roles';
import { getUsersList } from '../../../services/api-services/users';
import { useEffect, useState } from 'react';
import { Subject } from '../../../interfaces-types/subject';
import './UserRow.scss';
import DeleteUser from '../UserActions/DeleteUser';
import EditUser from '../UserActions/EditUser/index';

const UserRow = (props: UserRowInterface) => {
  const { user } = props;

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

  const getSubjects = (subArray: Subject[]): JSX.Element[] =>
    subArray.map((subject: Subject) => (
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
          <Select value="0" className="subject-list">
            <MenuItem value="0" className="subject-list__hidden-item">
              Subjects List
            </MenuItem>
            {getSubjects(user.subjects)}
          </Select>
        ) : (
          <Select value={'0'} disabled className="subject-list">
            <MenuItem value={'0'}>No Subjects Available</MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell>
        <EditUser
          user={user}
          isOpen={editModalIsOpen}
          setIsOpen={setEditModalIsOpen}
        />
        <DeleteUser username={user.username} />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
