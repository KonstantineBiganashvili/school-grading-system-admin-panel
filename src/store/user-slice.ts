import { createSlice } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: '',
      role_id: '',
      username: '',
      first_name: '',
      last_name: '',
    } as User,
  },

  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
  },
});

export default userSlice;
