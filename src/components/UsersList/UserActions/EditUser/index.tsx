import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@mui/material';
import { UserEditInterface } from '../../../../interfaces-types/props';
import { Subject } from '../../../../interfaces-types/subject';
import UserModal from '../../../Modals/common/UserModal';
import { User } from '../../../../interfaces-types/user';
import {
  editUser,
  getUsersList,
} from '../../../../services/api-services/users';
import { validateAddUserInput } from '../../../../helpers/inputValidation';
import { UserValidationError } from '../../../../interfaces-types/error';
import './EditUser.scss';
import { hash } from 'bcryptjs';
import { useAppDispatch } from '../../../../hooks/redux-hooks';
import userSlice from '../../../../store/user-slice';

const EditUser = (props: UserEditInterface) => {
  const { user, isOpen, setIsOpen } = props;
  const dispatch = useAppDispatch();

  const [error, setError] = useState<UserValidationError>({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: '',
    subjects: [],
  });

  const [oldPassword, setOldPassword] = useState('');

  const [inputFields, setInputFields] = useState<User>({
    id: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: 0,
    subjects: [] as Subject[],
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ): void => {
    setInputFields((oldInputFields) => ({
      ...oldInputFields,
      [field]: event.target.value,
    }));
  };

  const handleChooseSubject = (subject: Subject) => {
    setInputFields((oldInputFields) => {
      const subjectIndex = oldInputFields.subjects.findIndex(
        (chosenSubject) => chosenSubject.id === subject.id
      );

      if (subjectIndex === -1) {
        return {
          ...oldInputFields,
          subjects: [...oldInputFields.subjects, subject],
        };
      }

      const newSubjects = oldInputFields.subjects
        .slice(0, subjectIndex)
        .concat(
          oldInputFields.subjects.slice(
            subjectIndex + 1,
            oldInputFields.subjects.length
          )
        );

      return {
        ...oldInputFields,
        subjects: newSubjects,
      };
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (
      error.first_name.length ||
      error.last_name.length ||
      error.username.length ||
      error.role_id.length
    ) {
      return;
    }

    const editedData = { ...inputFields };

    if (!inputFields.password?.length) {
      editedData.password = oldPassword;
    } else {
      const newPassword = await hash(inputFields.password, 12);
      editedData.password = newPassword;
    }

    await editUser(editedData);
    handleClose();
  };

  useEffect(() => {
    if (user !== undefined) {
      user.password !== undefined && setOldPassword(user.password);
      const subjects: Subject[] = user?.subjects?.length ? user.subjects : [];
      const userToEdit = { ...user, password: '', subjects };
      setInputFields(userToEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    for (let key in inputFields) {
      validateAddUserInput(
        key,
        inputFields[key as keyof typeof inputFields],
        setError
      );
    }
  }, [inputFields]);

  useEffect(() => {
    const usersList = async (): Promise<void> => {
      dispatch(userSlice.actions.setUsersList(await getUsersList()));
    };

    usersList();
  }, [dispatch, isOpen]);

  return (
    <>
      <UserModal
        isOpen={isOpen}
        inputInfo={inputFields}
        handleChange={handleChange}
        handleChooseSubject={handleChooseSubject}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        error={error}
        isEdit={true}
      />
      <Button
        disabled={user?.role_id === 0}
        variant="contained"
        color="warning"
        className="action-btn"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </Button>
    </>
  );
};

export default EditUser;
