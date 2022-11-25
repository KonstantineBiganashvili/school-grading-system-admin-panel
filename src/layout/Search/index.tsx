import { TextField, Box } from '@mui/material';
import './Search.scss';
import { useEffect } from 'react';
import { SearchProps } from '../../interfaces-types/props';
import { useAppDispatch } from '../../hooks/redux-hooks';
import userSlice from '../../store/user-slice';
import { useAppSelector } from './../../hooks/redux-hooks';
import subjectsSlice from './../../store/subjects-slice';

const Search = (props: SearchProps) => {
  const { searchPage } = props;
  const inputValue = useAppSelector((state) => {
    return searchPage === 'users'
      ? state.user.searchInputValue
      : state.subjects.searchInputValue;
  });

  const dispatch = useAppDispatch();

  const handleChangeUserSearch = (event: { target: { value: string } }) => {
    dispatch(userSlice.actions.setSearchInputValue(event.target.value));
  };

  const handleChangeSubjectSearch = (event: { target: { value: string } }) => {
    dispatch(subjectsSlice.actions.setSearchInputValue(event.target.value));
  };

  useEffect(() => {
    searchPage === 'users'
      ? dispatch(userSlice.actions.filterUsers())
      : dispatch(subjectsSlice.actions.filterSubjects());
  }, [dispatch, inputValue, searchPage]);

  return (
    <Box className="search-container">
      <TextField
        label={
          searchPage === 'users'
            ? 'Search by Username, First Name or Last Name'
            : 'Search By Name'
        }
        className="search-container__input"
        value={inputValue}
        onChange={
          searchPage === 'users'
            ? handleChangeUserSearch
            : handleChangeSubjectSearch
        }
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default Search;
