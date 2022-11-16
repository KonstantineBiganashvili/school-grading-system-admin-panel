import { RolesList } from './roles-list';
import { User } from './user';

export interface IRootState {
  userReducer: User;
  rulesReducer: Array<RolesList>;
}
