import { Box, Button, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { LoginInfo } from '../../interfaces/auth';
import { login } from '../../services/api-services/login';
import './Login.scss';

const Login = () => {
  const [inputInfo, setInputInfo] = useState<LoginInfo>({
    username: '',
    password: '',
  });

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

  const handleLogin = (): void => {
    login(inputInfo);
  };

  return (
    <Box className="login">
      <TextField
        label="Username"
        className="login__input"
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          handleInput(event, 'username')
        }
      />
      <TextField
        label="Password"
        className="login__input"
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          handleInput(event, 'password')
        }
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
  );
};

export default Login;
