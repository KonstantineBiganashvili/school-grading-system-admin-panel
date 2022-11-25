import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '../interfaces-types/subject';

type InitialState = {
  subjectList: Array<Subject>;
  initialSubjectsList: Array<Subject>;
  searchInputValue: string;
};

const initialState: InitialState = {
  subjectList: [],
  initialSubjectsList: [],
  searchInputValue: '',
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,

  reducers: {
    setSubjects(state, action: PayloadAction<Subject[]>) {
      state.subjectList = action.payload;
      state.initialSubjectsList = action.payload;
    },

    setSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },

    filterSubjects(state, action: PayloadAction<undefined>) {
      if (!state.searchInputValue.length) {
        state.subjectList = state.initialSubjectsList;
        return;
      }

      const filteredSubjects = state.initialSubjectsList.filter((subject) =>
        subject.name
          .toLocaleLowerCase()
          .includes(state.searchInputValue.toLowerCase())
      );

      if (state.searchInputValue.length && filteredSubjects.length === 0) {
        state.subjectList = [
          {
            id: 0,
            name: 'Could Not Find',
          },
        ];
        return;
      }

      state.subjectList = filteredSubjects;
    },
  },
});

export default subjectsSlice;
