import React, { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import InputMask from 'react-input-mask';

const Register = ({ open, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        validateForm();
    }, [username, email, password, phone]);

    const validateForm = () => {
        const isUsernameValid = username.length >= 5;
        const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const isPasswordValid = password.length >= 8;
        const isPhoneValid = /^\+[0-9]\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(phone);
        setFormValid(isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid);
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        setPhone(input);
    };

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:8080/auth/sign-up', { username, email, password, phone });
            onClose();
        } catch (error) {
            setErrorText('Пользователь с таким именем/почтой/телефоном уже существует.');
            console.error('Registration failed', error);
        }
    };

    const handleClose = () => {
        setErrorText('');
        onClose();
    };

    return (
        <Dialog style={{ backdropFilter: "blur(15px)" }} fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Регистрация</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="usernameReg"
                    label="Имя пользователя"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={5}
                    inputProps={{ maxLength: 20 }}
                    error={username.length > 0 && username.length < 5}
                    helperText={username.length > 0 && username.length < 5 ? "Минимум 5 символов" : ""}
                />
                <TextField
                    margin="dense"
                    id="emailReg"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={email.length > 0 && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)}
                    helperText={email.length > 0 && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? "Неправильный формат email" : ""}
                />
                <TextField
                    margin="dense"
                    id="passwordReg"
                    label="Пароль"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    error={password.length > 0 && password.length < 8}
                    helperText={password.length > 0 && password.length < 8 ? "Минимум 8 символов" : ""}
                />
                <InputMask
                    mask="+7 (999) 999-99-99"
                    value={phone}
                    onChange={handlePhoneChange}
                >
                    {() => (
                        <TextField
                            margin="dense"
                            id="phoneReg"
                            label="Телефон"
                            type="tel"
                            fullWidth
                            required
                            error={phone.length > 0 && !/^\+[0-9]\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(phone)}
                            helperText={phone.length > 0 && !/^\+[0-9]\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(phone) ? "Неправильный формат телефона" : ""}
                        />
                    )}
                </InputMask>
                {errorText && (
                    <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
                        {errorText}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleRegister} color="primary" disabled={!formValid}>
                    Зарегистрироваться
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Register;
