import { TextField, Box } from '@mui/material';
import './Search.scss';
import { SetStateAction, useState, useEffect } from 'react';
import { SearchProps } from '../../interfaces-types/props';
import { useAppDispatch } from '../../hooks/redux-hooks';
import userSlice from '../../store/user-slice';

const Search = (props: SearchProps) => {
  const { searchPage } = props;
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    searchPage === 'users' &&
      dispatch(userSlice.actions.filterUsers(inputValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <Box className="search-container">
      <TextField
        label="Search by Username, First Name or Last Name"
        className="search-container__input"
        value={inputValue}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default Search;
