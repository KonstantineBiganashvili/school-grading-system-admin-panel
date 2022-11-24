import { Subject } from './subject';

export interface UserValidationError {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role_id: string;
  subjects: Subject[];
}
