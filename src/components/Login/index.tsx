import { Box, Button, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { LoginInfo } from '../../interfaces-types/auth';
import { login } from '../../services/api-services/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import userSlice from '../../store/user-slice';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { validateLoginInput } from '../../helpers/inputValidation';
import errorSlice from '../../store/error-slice';

const Login = () => {
  const [inputInfo, setInputInfo] = useState<LoginInfo>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<LoginInfo>({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.loggedUser);

  const handleInput = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ): void => {
    setInputInfo(
      (oldInputInfo: LoginInfo): LoginInfo => ({
        ...oldInputInfo,
        [field]: event.target.value,
      })
    );
  };

  const handleLogin = async (): Promise<void | boolean> => {
    if (!inputInfo.username || !inputInfo.password) {
      dispatch(
        errorSlice.actions.setGlobalError(
          'Please Fill Out Username and Password'
        )
      );
      return;
    }
    if (error.username.length || error.password.length) return;

    const response = await login(inputInfo);

    if (response.error) {
      dispatch(errorSlice.actions.setGlobalError(response.error));
      return;
    }

    dispatch(userSlice.actions.setUser(response));

    return response.role_id === 1 && navigate('/admin-panel');
  };

  useEffect(() => {
    for (let key in inputInfo) {
      validateLoginInput(
        key,
        inputInfo[key as keyof typeof inputInfo],
        setError
      );
    }
  }, [inputInfo]);

  useEffect(() => {
    if (user.role_id) navigate('/admin-panel');
  }, [navigate, user.role_id]);

  return (
    <>
      <Box className="login">
        <TextField
          label="Username"
          className="login__input"
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleInput(event, 'username')
          }
          error={Boolean(error.username.length)}
          helperText={error.username}
        />
        <TextField
          label="Password"
          type="password"
          className="login__input"
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            handleInput(event, 'password')
          }
          error={Boolean(error.password.length)}
          helperText={error.password}
        />
        <Button
          variant="contained"
          color="primary"
          className="login__btn"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
