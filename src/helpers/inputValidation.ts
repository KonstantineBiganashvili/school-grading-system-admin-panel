import { SetStateAction } from 'react';
import { LoginInfo, RegisterInfo } from '../interfaces-types/auth';

export const validateInput = (
  input: string,
  value: string,
  errorFunction: {
    (value: SetStateAction<LoginInfo | RegisterInfo>): void;
    (arg0: (oldErrors: any) => any): any;
  }
) => {
  if (!value.trim()) {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: 'Invalid Input',
    }));
  } else {
    errorFunction((oldErrors: any) => ({
      ...oldErrors,
      [input]: '',
    }));
  }
};
