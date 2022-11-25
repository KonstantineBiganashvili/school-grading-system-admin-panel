import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces-types/user';
import { Subject } from '../interfaces-types/subject';

type InitialState = {
  loggedUser: User;
  selectedRoles: string[];
  selectedSubjects: any[];
  searchInputValue: string;
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
  selectedRoles: [],
  searchInputValue: '',
  selectedSubjects: [],
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

    setSelectedRoles(state, action: PayloadAction<string | string[]>) {
      state.selectedRoles =
        typeof action.payload === 'string'
          ? action.payload.split(',')
          : action.payload;
    },

    setSelectedSubjects(state, action: PayloadAction<string | string[]>) {
      state.selectedSubjects =
        typeof action.payload === 'string'
          ? action.payload.split(',')
          : action.payload;
    },

    setSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },

    filterUsers(state, action: PayloadAction<undefined>) {
      let arrayToFilter = [...state.usersList];
      let filteredByRole: User[] = [];
      let filteredByName: User[] = [];
      let filteredBySubject: User[] = [];

      const inputValue = state.searchInputValue;

      if (
        !inputValue.trim().length &&
        state.selectedRoles.length === 0 &&
        state.selectedSubjects.length === 0
      ) {
        state.filteredUsersList = [...state.usersList];
        return;
      }

      inputValue.trim().length &&
        (filteredByName = arrayToFilter.filter((user) => {
          if (
            user.first_name.toLowerCase().includes(inputValue) ||
            user.last_name.toLowerCase().includes(inputValue) ||
            user.username.toLowerCase().includes(inputValue)
          )
            return true;

          return false;
        }));

      filteredByName.length && (arrayToFilter = filteredByName);

      state.selectedRoles.length &&
        (filteredByRole = arrayToFilter.filter((user) => {
          return state.selectedRoles.includes(String(user.role_id));
        }));

      arrayToFilter = [...state.usersList];
      filteredByName.length && (arrayToFilter = filteredByName);
      filteredByRole.length && (arrayToFilter = filteredByRole);

      state.selectedSubjects.length &&
        (filteredBySubject = arrayToFilter.filter((user) => {
          let sameSubjects: string | any[] = [];
          user.subjects &&
            user.subjects.length &&
            (sameSubjects = user.subjects.filter((subject) => {
              return state.selectedSubjects.includes(subject.name);
            }));

          return sameSubjects.length ? true : false;
        }));

      if (
        (inputValue.length && filteredByName.length === 0) ||
        (state.selectedRoles.length && filteredByRole.length === 0) ||
        (state.selectedSubjects.length && filteredBySubject.length === 0)
      ) {
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

      if (filteredBySubject.length) {
        state.filteredUsersList = [...filteredBySubject];
        return;
      }

      if (filteredByRole.length) {
        state.filteredUsersList = [...filteredByRole];
        return;
      }

      if (filteredByName.length) {
        state.filteredUsersList = [...filteredByName];
        return;
      }
    },
  },
});

export default userSlice;
