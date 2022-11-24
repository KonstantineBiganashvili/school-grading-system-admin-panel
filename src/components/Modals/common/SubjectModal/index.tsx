import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { SubjectModalInterface } from '../../../../interfaces-types/props';

const SubjectModal = (props: SubjectModalInterface) => {
  const {
    isOpen,
    handleClose,
    subjectName,
    handleChange,
    error,
    handleSubmit,
    isEdit,
  } = props;

  return (
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
          <Button variant="contained" onClick={handleSubmit}>
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubjectModal;
