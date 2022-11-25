import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import './Filter.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { useEffect } from 'react';
import userSlice from './../../../store/user-slice';

const Filter = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      },
    },
  };

  const dispatch = useAppDispatch();

  const roles = useAppSelector((state) => state.roles.rolesList);
  const selectedRoles = useAppSelector((state) => state.user.selectedRoles);
  const selectedSubjects = useAppSelector(
    (state) => state.user.selectedSubjects
  );
  const subjects = useAppSelector((state) => state.subjects.subjectList);

  const handleRoleFilterChange = (
    event: SelectChangeEvent<typeof selectedRoles>
  ) => {
    const {
      target: { value },
    } = event;
    dispatch(userSlice.actions.setSelectedRoles(value));
  };

  const handleSubjectFilterChange = (
    event: SelectChangeEvent<typeof selectedSubjects>
  ) => {
    const {
      target: { value },
    } = event;
    dispatch(userSlice.actions.setSelectedSubjects(value));
  };

  const renderRoleFilterValues = (): string => {
    let valuesToRender: string[] = [];

    roles.forEach((role) => {
      selectedRoles.includes(String(role.id)) && valuesToRender.push(role.role);
    });

    return valuesToRender.join(', ');
  };

  useEffect(() => {
    dispatch(userSlice.actions.filterUsers());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoles, selectedSubjects]);

  return (
    <Box className="filter-container">
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel>Filter By Role</InputLabel>
        <Select
          multiple
          value={selectedRoles}
          onChange={handleRoleFilterChange}
          input={<OutlinedInput label="Filter By Role" />}
          renderValue={() => renderRoleFilterValues()}
          style={{
            height: '50px',
          }}
        >
          {roles.map((role) => (
            <MenuItem key={role.role} value={String(role.id)}>
              <Checkbox checked={selectedRoles.indexOf(String(role.id)) > -1} />
              <ListItemText primary={role.role} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel>Filter By Subject</InputLabel>
        <Select
          multiple
          value={selectedSubjects}
          onChange={handleSubjectFilterChange}
          input={<OutlinedInput label="Filter By Subject" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{
            height: '50px',
          }}
        >
          {subjects.map((subject) => (
            <MenuItem key={subject.name} value={subject.name}>
              <Checkbox checked={selectedSubjects.indexOf(subject.name) > -1} />
              <ListItemText primary={subject.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
