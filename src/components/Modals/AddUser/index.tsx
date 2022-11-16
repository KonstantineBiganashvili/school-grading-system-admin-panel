import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { getRoles } from '../../../services/api-services/roles';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import rolesSlice from '../../../store/roles-slice';
import { register } from '../../../services/api-services/register';
import { RegisterInfo } from '../../../interfaces-types/auth';
import './AddUser.scss';
import { AddUserInterface } from '../../../interfaces-types/props';
import subjectsSlice from '../../../store/subjects-slice';
import { getSubjects } from '../../../services/api-services/subjects';
import { Subject } from '../../../interfaces-types/subject';

const AddUser = (props: AddUserInterface) => {
  const { addUserModalIsOpen, setAddUserModalIsOpen } = props;
  // const [error, setError] = useState<RegisterInfo>({
  //   username: '',
  //   password: '',
  //   first_name: '',
  //   last_name: '',
  //   role_id: '',
  // });

  const dispatch = useAppDispatch();
  const rolesList = useAppSelector((state) => state.roles.rolesList);
  const subjectsList = useAppSelector((state) => state.subjects.subjectList);
  const [inputInfo, setInputInfo] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: '',
    subjects: [],
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ): void => {
    setInputInfo((oldInputInfo) => ({
      ...oldInputInfo,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const newUser: RegisterInfo = {
      ...inputInfo,
      id: uuid(),
    };

    await register(newUser);
  };

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
    <Modal
      open={addUserModalIsOpen}
      onClose={() => setAddUserModalIsOpen(false)}
    >
      <Box className="add-user-container">
        <TextField
          className="add-user-container__input"
          label="Username"
          value={inputInfo.username}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'username')
          }
        />
        <TextField
          className="add-user-container__input"
          label="Password"
          value={inputInfo.password}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'password')
          }
        />
        <TextField
          className="add-user-container__input"
          label="First Name"
          value={inputInfo.first_name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'first_name')
          }
        />
        <TextField
          className="add-user-container__input"
          label="Last Name"
          value={inputInfo.last_name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'last_name')
          }
        />
        <TextField
          className="add-user-container__input"
          select
          label="Role"
          value={inputInfo.role_id}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleChange(event, 'role_id')
          }
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
            <MenuItem value="" disabled>
              Roles Are Not Available
            </MenuItem>
          )}
        </TextField>
        <Box>
          {/* {subjectsList.length
            ? subjectsList.map((subject: Subject) => (
                <Box key={subject.id}>
                  <Checkbox
                    value={subject.id}
                    checked={inputInfo.subjects.indexOf(subject.id) > -1}
                  />
                  <Typography>{subject.name}</Typography>
                </Box>
              ))
            : null} */}
        </Box>
        <Box className="add-user-container__btn-group">
          <Button
            variant="contained"
            color="error"
            onClick={() => setAddUserModalIsOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Add User
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUser;
