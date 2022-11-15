export interface LoginInfo {
  username: string;
  password: string;
}

export interface RegisterInfo {
  id: string;
  role_id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  subjects?: string[];
}
