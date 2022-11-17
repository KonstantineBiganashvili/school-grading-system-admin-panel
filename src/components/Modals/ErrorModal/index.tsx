import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import './ErrorModal.scss';
import errorSlice from '../../../store/error-slice';

const ErrorModal = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.error.globalError);

  const handleErrorModalClose = () => {
    dispatch(errorSlice.actions.clearGlobalError());
  };

  return (
    <Modal open={Boolean(error.length)} onClose={handleErrorModalClose}>
      <Box className="error-modal">
        <Typography>{error}</Typography>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
