import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import './AdminPanel.scss';
import AddUser from '../Modals/AddUser';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { User } from '../../interfaces-types/user';
import Header from '../../layout/Header';
import AddSubject from '../Modals/AddSubject';

const AdminPanel = () => {
  const [addUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
  const [addSubjectModalIsOpen, setAddSubjectModalIsOpen] = useState(false);
  const user: User = useAppSelector((state) => state.user.loggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role_id !== 1) navigate('/');
  }, [navigate, user.role_id]);

  return (
    <>
      <Header />
      <Box className="admin-panel-container">
        <Button variant="contained" onClick={() => setAddUserModalIsOpen(true)}>
          Add User
        </Button>
        <Button
          variant="contained"
          onClick={() => setAddSubjectModalIsOpen(true)}
        >
          Add Subject
        </Button>
        <AddUser
          isOpen={addUserModalIsOpen}
          setIsOpen={setAddUserModalIsOpen}
        />
        <AddSubject
          isOpen={addSubjectModalIsOpen}
          setIsOpen={setAddSubjectModalIsOpen}
        />
      </Box>
    </>
  );
};

export default AdminPanel;
