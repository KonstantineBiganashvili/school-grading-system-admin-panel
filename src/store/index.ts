import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import rolesSlice from './roles-slice';
import errorSlice from './error-slice';
import subjectsSlice from './subjects-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    roles: rolesSlice.reducer,
    error: errorSlice.reducer,
    subjects: subjectsSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
