import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '../interfaces-types/subject';

type InitialState = {
  subjectList: Array<Subject>;
  initialSubjectsList: Array<Subject>;
};

const initialState: InitialState = {
  subjectList: [],
  initialSubjectsList: [],
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,

  reducers: {
    setSubjects(state, action: PayloadAction<Subject[]>) {
      state.subjectList = action.payload;
      state.initialSubjectsList = action.payload;
    },
  },
});

export default subjectsSlice;
