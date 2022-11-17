export interface User {
  id: string;
  role_id: number;
  username: string;
  password?: string;
  first_name: string;
  last_name: string;
  subjects?: string[];
}
