import React, { ChangeEvent, useEffect } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import rolesSlice from '../../../../store/roles-slice';
import subjectsSlice from '../../../../store/subjects-slice';
import { getRoles } from '../../../../services/api-services/roles';
import { getSubjects } from '../../../../services/api-services/subjects';
import { Subject } from '../../../../interfaces-types/subject';
import { UserModalInterface } from '../../../../interfaces-types/props';
import './UserModal.scss';

const UserModal = (props: UserModalInterface) => {
  const {
    isOpen,
    inputInfo,
    handleChooseSubject,
    handleChange,
    handleClose,
    handleSubmit,
    error,
    isEdit,
  } = props;

  const rolesList = useAppSelector((state) => state.roles.rolesList);
  const subjectsList = useAppSelector((state) => state.subjects.subjectList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const rolesList = async (): Promise<any> => {
      return dispatch(rolesSlice.actions.setRoles(await getRoles()));
    };

    const subjectsList = async (): Promise<any> => {
      return dispatch(subjectsSlice.actions.setSubjects(await getSubjects()));
    };

    rolesList();
    subjectsList();
  }, [dispatch]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="add-user-container">
        <TextField
          className="add-user-container__input"
          label="Username"
          value={inputInfo.username}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'username')
          }
          error={Boolean(error.username.length)}
          helperText={error.username}
        />
        <TextField
          className="add-user-container__input"
          label="Password"
          value={inputInfo.password}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'password')
          }
          error={isEdit ? false : Boolean(error.password.length)}
          helperText={error.password}
        />
        <TextField
          className="add-user-container__input"
          label="First Name"
          value={inputInfo.first_name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'first_name')
          }
          error={Boolean(error.first_name.length)}
          helperText={error.first_name}
        />
        <TextField
          className="add-user-container__input"
          label="Last Name"
          value={inputInfo.last_name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'last_name')
          }
          error={Boolean(error.last_name.length)}
          helperText={error.last_name}
        />
        <TextField
          className="add-user-container__input"
          select
          label="Role"
          value={inputInfo.role_id ? inputInfo.role_id : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'role_id')
          }
          error={Boolean(error.role_id.length)}
          helperText={error.role_id}
        >
          {rolesList.length ? (
            rolesList.map((role) => {
              return (
                <MenuItem key={role.id} value={role.id}>
                  {role.role}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={0} disabled>
              Roles Are Not Available
            </MenuItem>
          )}
        </TextField>
        <Box className="add-user-container__subjects">
          {subjectsList.length
            ? subjectsList.map((subject: Subject) => {
                return (
                  <Box key={subject.id}>
                    <Checkbox
                      value={subject.id}
                      onClick={() => handleChooseSubject(subject)}
                      checked={
                        inputInfo.subjects !== undefined &&
                        inputInfo.subjects.findIndex(
                          (chosenSubject: Subject) => {
                            return chosenSubject.id === subject.id;
                          }
                        ) !== -1
                      }
                    />
                    <Typography>{subject.name}</Typography>
                  </Box>
                );
              })
            : null}
        </Box>
        <Box className="add-user-container__btn-group">
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEdit ? 'Edit User' : 'Add User'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
