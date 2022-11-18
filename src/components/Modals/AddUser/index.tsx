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
import { ModalInterface } from '../../../interfaces-types/props';
import subjectsSlice from '../../../store/subjects-slice';
import { getSubjects } from '../../../services/api-services/subjects';
import { Subject } from '../../../interfaces-types/subject';
import { validateAddUserInput } from '../../../helpers/inputValidation';
import { checkUser } from '../../../services/api-services/users';
import errorSlice from '../../../store/error-slice';

const AddUser = (props: ModalInterface) => {
  const { isOpen, setIsOpen } = props;
  const [error, setError] = useState<RegisterInfo>({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: '',
    subjects: [],
  });

  const dispatch = useAppDispatch();
  const rolesList = useAppSelector((state) => state.roles.rolesList);
  const subjectsList = useAppSelector((state) => state.subjects.subjectList);
  const [inputInfo, setInputInfo] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: '',
    subjects: [] as Subject[],
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

  const handleChooseSubject = (subject: Subject): void => {
    setInputInfo((oldInputInfo) => {
      const subjectIndex = oldInputInfo.subjects.findIndex(
        (chosenSubject) => chosenSubject.id === subject.id
      );

      if (subjectIndex === -1) {
        return {
          ...oldInputInfo,
          subjects: [...oldInputInfo.subjects, subject],
        };
      }

      const newSubjects = oldInputInfo.subjects
        .slice(0, subjectIndex)
        .concat(
          oldInputInfo.subjects.slice(
            subjectIndex + 1,
            oldInputInfo.subjects.length
          )
        );

      return {
        ...oldInputInfo,
        subjects: newSubjects,
      };
    });
  };

  const handleClose = () => {
    setInputInfo({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      role_id: '',
      subjects: [],
    });
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (
      error.first_name.length ||
      error.last_name.length ||
      error.username.length ||
      error.password.length ||
      error.role_id.length
    ) {
      return;
    }

    const exists = await checkUser(inputInfo);

    if (exists) {
      return dispatch(errorSlice.actions.setGlobalError(exists.error));
    }

    const newUser: RegisterInfo = {
      ...inputInfo,
      id: uuid(),
    };

    register(newUser);
    handleClose();
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

  useEffect(() => {
    for (let key in inputInfo) {
      validateAddUserInput(
        key,
        inputInfo[key as keyof typeof inputInfo],
        setError
      );
    }
  }, [inputInfo]);

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
          error={Boolean(error.password.length)}
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
          value={inputInfo.role_id}
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
            <MenuItem value="" disabled>
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
                        inputInfo.subjects.findIndex((chosenSubject) => {
                          return chosenSubject.id === subject.id;
                        }) !== -1
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
            Add User
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUser;
