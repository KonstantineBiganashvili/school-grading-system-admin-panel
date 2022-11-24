import { User } from './user';

export interface ModalInterface {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export interface UserRowInterface {
  user: User;
}
