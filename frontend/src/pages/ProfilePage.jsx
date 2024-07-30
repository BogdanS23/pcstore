import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import AuthService from "../services/AuthService";
import { ProfOrderCard } from "../components/ProfOrderCard.jsx";
import "../styles/ProfilePage.css";
import { Button, styled, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import InputMask from "react-input-mask";

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const [myPcs, setMyPcs] = useState(false);
    const [email, setEmail] = useState(AuthService.getEmail());
    const [phone, setPhone] = useState(AuthService.getPhone());
    const [openEmailPhoneDialog, setOpenEmailPhoneDialog] = useState(false);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const userToken = JSON.parse(localStorage.getItem('user')).token;
    console.log(userToken);
    console.log(userToken.token);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/orders", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error("There was an error fetching the orders!", error);
            }
        };

        fetchOrders();
    }, []);

    const CustomButton = styled(Button)(({ selected }) => ({
        backgroundColor: selected ? "lightgray" : "#bdbdbd",
        fontSize: "26px",
        fontFamily: 'silkscreen',
        color: selected ? "white" : "black",
        paddingRight: "70px",
        paddingLeft: "70px",
        '&:hover': {
            backgroundColor: selected ? "lightgray" : "darkgray",
            color: "black"
        }
    }));

    const changeEmailAndPhone = async () => {
        console.log(AuthService.getCurrentUser());
        const data = {
            username: AuthService.getUsername(),
            email: email,
            phone: phone,
            role: AuthService.getRole(),
        };

        try {
            await axios.put(`http://localhost:8080/api/users/${AuthService.getUserId()}`, data);
        } catch (error) {
            console.error("Edit user with error:", error);
        }
        AuthService.logout();
        window.location.reload();
    }

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        setPhone(input);
    };

    const handleEmailPhoneDialogOpen = () => {
        setOpenEmailPhoneDialog(true);
    };

    const handleEmailPhoneDialogClose = () => {
        setOpenEmailPhoneDialog(false);
    };

    const handlePasswordDialogOpen = () => {
        setOpenPasswordDialog(true);
    };

    const handlePasswordDialogClose = () => {
        setOpenPasswordDialog(false);
    };

    const handleChangePassword = async () => {
        // Добавьте здесь логику для изменения пароля
        console.log(AuthService.getCurrentUser());
        const data = {
            username: AuthService.getUsername(),
            email: email,
            phone: phone,
            role: AuthService.getRole(),
            password: newPassword,
        };

        try {
            await axios.put(`http://localhost:8080/api/users/${AuthService.getUserId()}/changePassword`, data);
        } catch (error) {
            console.error("Edit password with error:", error);
        }
        AuthService.logout();
        window.location.reload();
        setOpenPasswordDialog(false);
    };

    return (
        <>
            <Header isProfilePage />
            <div className="profile-container">
                <div className="profile-header">Мои данные</div>
                <div className="profile-info">
                    <div><span style={{fontWeight: "bold"}}>Ваш логин: </span>{AuthService.getUsername()}</div>
                    <div><span style={{fontWeight: "bold"}}>Электронная почта: </span>{email}</div>
                    <div><span style={{fontWeight: "bold"}}>Телефон: </span>{phone}</div>
                    <Button onClick={handleEmailPhoneDialogOpen}>Изменить почту и телефон</Button>
                    <Button onClick={handlePasswordDialogOpen}>Изменить пароль</Button>
                </div>
                <div className="profile-header">
                    <CustomButton
                        onClick={() => setMyPcs(false)}
                        selected={!myPcs}
                    >
                        Мои заказы
                    </CustomButton>
                    <CustomButton
                        onClick={() => setMyPcs(true)}
                        selected={myPcs}
                    >
                        Мои сборки
                    </CustomButton>
                </div>
                <ProfOrderCard orders={orders} isMyPcs={myPcs} />
            </div>

            {/* Диалоговое окно для изменения почты и телефона */}
            <Dialog open={openEmailPhoneDialog} onClose={handleEmailPhoneDialogClose}>
                <DialogTitle>Изменить почту и телефон</DialogTitle>
                <DialogContent>
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
                                error={phone.length > 0 && !/^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(phone)}
                                helperText={phone.length > 0 && !/^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(phone) ? "Неправильный формат телефона" : ""}
                            />
                        )}
                    </InputMask>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmailPhoneDialogClose}>Отмена</Button>
                    <Button onClick={changeEmailAndPhone}>Изменить</Button>
                </DialogActions>
            </Dialog>

            {/* Диалоговое окно для изменения пароля */}
            <Dialog open={openPasswordDialog} onClose={handlePasswordDialogClose}>
                <DialogTitle>Изменить пароль</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="newPassword"
                        label="Новый пароль"
                        type="password"
                        fullWidth
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength={8}
                        error={newPassword.length > 0 && newPassword.length < 8}
                        helperText={newPassword.length > 0 && newPassword.length < 8 ? "Минимум 8 символов" : ""}
                    />
                    <TextField
                        margin="dense"
                        id="confirmNewPassword"
                        label="Подтвердите новый пароль"
                        type="password"
                        fullWidth
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        error={confirmNewPassword !== newPassword}
                        helperText={confirmNewPassword !== newPassword ? "Пароли не совпадают" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePasswordDialogClose}>Отмена</Button>
                    <Button disabled={!(newPassword && confirmNewPassword && newPassword === confirmNewPassword && newPassword.length > 7)} onClick={handleChangePassword}>Изменить</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProfilePage;
