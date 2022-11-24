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
import { useAppSelector } from '../../../hooks/redux-hooks';
import { useState } from 'react';

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

  const roles = useAppSelector((state) => state.roles.rolesList);
  const subjects = useAppSelector((state) => state.subjects.subjectList);
  const [selectedRoles, setSelectedRoles] = useState<Array<string>>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Array<string>>([]);

  const handleRoleFilterChange = (
    event: SelectChangeEvent<typeof selectedRoles>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedRoles(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubjectFilterChange = (
    event: SelectChangeEvent<typeof selectedSubjects>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSubjects(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box className="filter-container">
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel>Filter By Role</InputLabel>
        <Select
          multiple
          value={selectedRoles}
          onChange={handleRoleFilterChange}
          input={<OutlinedInput label="Filter By Role" />}
          renderValue={(selected) => selected.join(', ')}
          style={{
            height: '50px',
          }}
        >
          {roles.map((role) => (
            <MenuItem key={role.role} value={role.role}>
              <Checkbox checked={selectedRoles.indexOf(role.role) > -1} />
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
