import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces-types/user';
import { Subject } from '../interfaces-types/subject';

type InitialState = {
  loggedUser: User;
  usersList: User[];
  filteredUsersList: User[];
};

const currentUser: User = JSON.parse(localStorage.getItem('user') || '{}');

const initialState: InitialState = {
  loggedUser: currentUser || {
    id: '',
    role_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    subjects: [] as Subject[],
  },
  usersList: [],
  filteredUsersList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser(state, action: PayloadAction<User>) {
      localStorage.setItem('user', JSON.stringify(action.payload));

      state.loggedUser = action.payload;
    },

    clearUser(state) {
      state.loggedUser = {
        id: '',
        role_id: 0,
        username: '',
        first_name: '',
        last_name: '',
        subjects: [],
      };
    },

    setUsersList(state, action: PayloadAction<any>) {
      state.usersList = action.payload;
    },

    filterUsers(state, action: PayloadAction<string>) {
      const inputValue = action.payload.toLowerCase().trim();

      if (!inputValue.trim().length) {
        state.filteredUsersList = [...state.usersList];
        return;
      }

      const filteredUsers = [...state.usersList].filter((user) => {
        if (
          user.first_name.toLowerCase().includes(inputValue) ||
          user.last_name.toLowerCase().includes(inputValue) ||
          user.username.toLowerCase().includes(inputValue)
        )
          return true;

        return false;
      });

      if (filteredUsers.length === 0) {
        state.filteredUsersList = [
          {
            id: '0',
            role_id: 0,
            username: 'Could Not Find',
            password: '',
            first_name: 'Could Not Find',
            last_name: 'Could Not Find',
            subjects: [],
          },
        ];

        return;
      }

      state.filteredUsersList = [...filteredUsers];
    },
  },
});

export default userSlice;
