import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces-types/user';

type InitialState = {
  loggedUser: User;
};

const currentUser: User = JSON.parse(localStorage.getItem('user') || '{}');

const initialState: InitialState = { loggedUser: currentUser } || {
  loggedUser: {
    id: '',
    role_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    subjects: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser(state, action: PayloadAction<User>) {
      localStorage.setItem('user', JSON.stringify(action.payload));

      state.loggedUser = action.payload;
    },
  },
});

export default userSlice;
