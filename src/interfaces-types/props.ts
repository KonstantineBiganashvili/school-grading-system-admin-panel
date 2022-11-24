import { ChangeEvent } from 'react';
import { User } from './user';
import { Subject } from './subject';
import { UserValidationError } from './error';

export interface ModalInterface {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export interface UserRowInterface {
  user: User;
}

export interface UserDeleteInterface {
  username: string;
}

export interface UserEditInterface extends ModalInterface {
  user?: User;
  isEdit?: boolean;
  setIsEdit?: (state: boolean) => void;
}

export interface SubjectEditInterface {
  index: number;
  subject: Subject;
  isEdit?: boolean;
  setIsEdit?: (state: boolean) => void;
}

export interface UserModalInterface {
  isOpen: boolean;
  inputInfo: User;
  handleChange: (event: ChangeEvent<HTMLInputElement>, field: string) => void;
  handleChooseSubject: (subject: Subject) => void;
  handleClose: () => void;
  handleSubmit: () => Promise<
    | {
        payload: string;
        type: 'errors/setGlobalError';
      }
    | undefined
    | void
  >;
  error: UserValidationError;
  isEdit: boolean;
}

export interface SubjectsRowInterface {
  subject: Subject;
  index: number;
}

export interface SubjectDeleteInteface {
  index: number;
}

export interface SubjectModalInterface {
  isOpen: boolean;
  handleClose: () => void;
  subjectName: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  handleSubmit: () => void;
  isEdit: boolean;
}
