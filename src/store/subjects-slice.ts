import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '../interfaces-types/subject';

type InitialState = {
  subjectList: Array<Subject>;
};

const initialState: InitialState = {
  subjectList: [],
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,

  reducers: {
    setSubjects(state, action: PayloadAction<Subject[]>) {
      state.subjectList = action.payload;
    },
  },
});

export default subjectsSlice;
