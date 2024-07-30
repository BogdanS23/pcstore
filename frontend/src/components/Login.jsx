import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../services/AuthService';
import Register from "./Register.jsx";

const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && !AuthService.isTokenExpired()) {
      setRole(currentUser.role);
      setLoggedIn(true);
      if (currentUser.role === 'ROLE_ADMIN') {
        navigate('/adminpage');
      }
    }
  }, [navigate]);

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setErrorText('');
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenRegister = () => {
    setOpenRegister(true);
    setErrorText('');
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleLogin = async () => {
    try {
      await AuthService.login(username, password);
      const currentUser = AuthService.getCurrentUser();
      setRole(currentUser.role);
      setLoggedIn(true);
      handleCloseLogin();
      if (currentUser.role === 'ROLE_ADMIN') {
        navigate('/adminpage');
      }
    } catch (error) {
      console.error('Login failed', error);
      setErrorText('Неверное имя пользователя или пароль. Попробуйте еще раз.');
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setRole('');
    setLoggedIn(false);
    navigate('/');
  };

  return (
      <div style={{ justifySelf: "flex-end" }}>
        {loggedIn ? (
            <>
              {role === 'ROLE_ADMIN' && (
                  <Link to='/adminpage'>
                    <Button className="admin-button" variant="contained" color="primary" >
                      Администрирование
                    </Button>
                  </Link>
              )}
              {role === 'ROLE_USER' && (
                  <Link to='/profile'>
                    <Button className="lk-button" variant="contained" color="primary" >
                      Личный кабинет
                    </Button>
                  </Link>
              )}
              <Button className="login-button" variant="contained" color="primary" onClick={handleLogout}>
                Выйти
              </Button>
            </>
        ) : (
            <>
              <Button className="login-button" variant="contained" color="primary" onClick={handleOpenLogin}>
                Войти
              </Button>
              <Dialog style={{ backdropFilter: "blur(15px)" }} fullWidth open={openLogin} onClose={handleCloseLogin}>
                <DialogTitle>Вход</DialogTitle>
                <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="Имя пользователя"
                      type="text"
                      fullWidth
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                      margin="dense"
                      id="password"
                      label="Пароль"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorText && (
                      <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
                        {errorText}
                      </Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseLogin} color="primary">
                    Отмена
                  </Button>
                  <Button onClick={handleLogin} color="primary">
                    Войти
                  </Button>
                  <Button onClick={handleOpenRegister} color="primary">
                    Зарегистрироваться
                  </Button>
                </DialogActions>
              </Dialog>
            </>
        )}
        <Register open={openRegister} onClose={handleCloseRegister}/>
      </div>
  );
};

export default Login;
