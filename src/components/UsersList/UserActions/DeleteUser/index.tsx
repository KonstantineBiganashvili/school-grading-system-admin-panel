import { Button, Modal, Box, Typography } from '@mui/material';
import { userDeleteInterface } from '../../../../interfaces-types/props';
import './DeleteUser.scss';
import { deleteUser } from '../../../../services/api-services/users';
import { useState } from 'react';

const DeleteUser = (props: userDeleteInterface) => {
  const { username } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteUser = async () => {
    await deleteUser(username);
    setIsOpen(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={(): void => setIsOpen(false)}>
        <Box className="delete-modal">
          <Typography variant="h6">
            Are you sure you want to delete this user?
          </Typography>
          <Box className="delete-modal__btn-container">
            <Button
              variant="contained"
              color="error"
              onClick={(): void => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDeleteUser}>
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
