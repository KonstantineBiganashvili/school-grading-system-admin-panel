import { AccountBox } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Popover } from '@mui/material';
// import {} from '@m'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import './Header.scss';
import userSlice from '../../store/user-slice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(userSlice.actions.clearUser());
    navigate('/');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const user = useAppSelector((state) => state.user.loggedUser);

  return (
    <AppBar>
      <Container className="header">
        <Box className="header__links-container">
          <Link to={'/'} className="header__links-container__link">
            Home
          </Link>
          {user.role_id === 1 && (
            <Link to={'/admin-panel'} className="header__links-container__link">
              Admin Panel
            </Link>
          )}
          {(user.role_id === 1 || user.role_id === 2) && (
            <Link to={'/users-list'} className="header__links-container__link">
              Users List
            </Link>
          )}
        </Box>
        <Box>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            className="header__user-icon-btn"
          >
            <AccountBox className="header__user-icon" />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            className="header__popover"
          >
            <Box className="header__popover-container">
              <Button
                className="header__popover-btn"
                variant="contained"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>
          </Popover>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
