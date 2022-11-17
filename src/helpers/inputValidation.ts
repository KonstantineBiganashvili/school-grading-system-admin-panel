import { SetStateAction } from 'react';
import { LoginInfo, RegisterInfo } from '../interfaces-types/auth';
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
  value: string | Subject[] | number,
  errorFunction: {
    (value: SetStateAction<RegisterInfo>): void;
    (arg0: (oldErrors: any) => any): any;
  }
) => {
  if (input === 'role_id' && typeof value === 'string' && !value.trim()) {
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
