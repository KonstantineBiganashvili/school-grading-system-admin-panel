import React, { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { register } from '../../../services/api-services/register';
import { RegisterInfo } from '../../../interfaces-types/auth';
import './AddUser.scss';
import { ModalInterface } from '../../../interfaces-types/props';
import { Subject } from '../../../interfaces-types/subject';
import { validateAddUserInput } from '../../../helpers/inputValidation';
import { checkUser } from '../../../services/api-services/users';
import errorSlice from '../../../store/error-slice';
import UserModal from '../common/UserModal';
import { UserValidationError } from '../../../interfaces-types/error';

const AddUser = (props: ModalInterface) => {
  const { isOpen, setIsOpen } = props;
  const [error, setError] = useState<UserValidationError>({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: '',
    subjects: [],
  });

  const [inputInfo, setInputInfo] = useState({
    id: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: 0,
    subjects: [] as Subject[],
  });

  const dispatch = useAppDispatch();

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
      id: '',
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      role_id: 0,
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
    for (let key in inputInfo) {
      validateAddUserInput(
        key,
        inputInfo[key as keyof typeof inputInfo],
        setError
      );
    }
  }, [inputInfo]);

  return (
    <UserModal
      isOpen={isOpen}
      inputInfo={inputInfo}
      handleChange={handleChange}
      handleChooseSubject={handleChooseSubject}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      error={error}
      isEdit={false}
    />
  );
};

export default AddUser;
