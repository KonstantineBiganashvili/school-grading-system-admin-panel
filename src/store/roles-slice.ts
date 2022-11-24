import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../interfaces-types/roles-list';

type InitialState = {
  rolesList: Array<Role>;
};

const initialState: InitialState = {
  rolesList: [],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,

  reducers: {
    setRoles(state, action: PayloadAction<Role[]>) {
      state.rolesList = action.payload;
    },
  },
});

export default rolesSlice;
