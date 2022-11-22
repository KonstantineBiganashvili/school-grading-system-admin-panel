import { Button, Modal, Box, Typography } from '@mui/material';
import { SubjectDeleteInteface } from '../../../../interfaces-types/props';
import { useState } from 'react';
import { deleteSubject } from '../../../../services/api-services/subjects';
import './DeleteSubject.scss';

const DeleteUser = (props: SubjectDeleteInteface) => {
  const { index } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteSubject = async () => {
    await deleteSubject(index);
    setIsOpen(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={(): void => setIsOpen(false)}>
        <Box className="delete-modal">
          <Typography variant="h6">
            Are you sure you want to delete this subject?
          </Typography>
          <Box className="delete-modal__btn-container">
            <Button
              variant="contained"
              color="error"
              onClick={(): void => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDeleteSubject}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Button
        variant="contained"
        color="error"
        className="action-btn"
        onClick={(): void => setIsOpen(true)}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteUser;
