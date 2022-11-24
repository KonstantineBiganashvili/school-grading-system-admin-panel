import { Box, Button, Modal, TextField } from '@mui/material';
import { ModalInterface } from '../../../interfaces-types/props';
import { ChangeEvent, useEffect, useState } from 'react';
import { validateAddSubject } from '../../../helpers/inputValidation';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { addSubject } from '../../../services/api-services/subjects';
import errorSlice from '../../../store/error-slice';
import './AddSubject.scss';

const AddSubject = (props: ModalInterface) => {
  const { isOpen, setIsOpen } = props;

  const dispatch = useAppDispatch();

  const [subjectName, setSubjectName] = useState('');
  const [error, setError] = useState('');
  const subjects = useAppSelector((state) => state.subjects.subjectList);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubjectName(event.target.value);
  };

  const handleClose = (): void => {
    setSubjectName('');
    setIsOpen(false);
  };

  const handleAdd = (): void => {
    if (error.length) return;

    const existingSubject = subjects.find(
      (existing) => existing.name.toLowerCase() === subjectName.toLowerCase()
    );

    if (existingSubject) {
      dispatch(
        errorSlice.actions.setGlobalError(
          `Subject with the name '${subjectName}' already exists`
        )
      );
    } else {
      const newSubject = {
        id: subjects[subjects.length - 1].id + 1,
        name: subjectName,
      };

      addSubject(newSubject);
      handleClose();
    }
  };

  useEffect(() => {
    validateAddSubject(subjectName, setError);
  }, [subjectName]);

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className="add-subject-container">
          <TextField
            label="Name"
            className="add-subject-container__input"
            value={subjectName}
            onChange={handleChange}
            error={Boolean(error.length)}
            helperText={error}
          />
          <Box className="add-subject-container__btn-group">
            <Button variant="contained" onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddSubject;
