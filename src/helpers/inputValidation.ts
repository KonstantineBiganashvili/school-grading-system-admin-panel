import { SetStateAction } from 'react';
import { LoginInfo } from '../interfaces-types/auth';
import { UserValidationError } from '../interfaces-types/error';
import { Subject } from '../interfaces-types/subject';

export const validateLoginInput = (
  input: string,
  value: string,
  errorFunction: {
    (value: SetStateAction<LoginInfo>): void;
    (arg0: (oldErrors: any) => any): any;
  }
) => {
  if (!value.trim()) {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: 'Please Fill',
    }));
  } else {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: '',
    }));
  }
};

export const validateAddUserInput = (
  input: string,
  value: string | Subject[] | number | undefined,
  errorFunction: {
    (value: SetStateAction<UserValidationError>): void;
    (arg0: (oldErrors: any) => any): any;
  }
) => {
  if (
    input === 'role_id' &&
    ((typeof value === 'string' && !value.trim()) ||
      (typeof value === 'number' && value === 0))
  ) {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: 'Please Choose',
    }));
  } else if (typeof value === 'string' && !value.trim()) {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: 'Please Fill',
    }));
  } else {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: '',
    }));
  }
};

export const validateAddSubject = (
  value: string,
  errorFunction: {
    (value: SetStateAction<string>): void;
    (arg0: (oldErrors: any) => any): any;
  }
) => {
  if (!value.length) {
    errorFunction('Please Fill');
  } else {
    errorFunction('');
  }
};
