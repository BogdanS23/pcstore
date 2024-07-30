import logo from "../assets/logo.png"
import Header from "../components/Header.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import React from "react";
import AuthService from '../services/AuthService';

export const AdminPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };
    return(
        <>
            <div className="admin-page">
                {/*<Header/>*/}
                <div className="logo-grid">
                    <div className="logo">
                        <img className="logo-img" src={logo} alt=""/>
                        <div className="logo-text">PC STORE</div>
                    </div>
                </div>
                <div className="hello-text">Здравсвуйте, {AuthService.getUsername()}! Вы вошли, как администратор.</div>
                <div className="main-content" style={{background:"none"}}>
                    <Link to='/adminpanel'>
                        <Button className="admin-button" variant="contained" color="primary" style={{width: "200px", marginRight: "20px"}}>
                            Администрирование
                        </Button>
                    </Link>
                    <Link to='/' style={{textDecoration: "none"}}>
                        <Button className="logout-button" variant="contained" color="primary" onClick={handleLogout} style={{width: "200px", marginLeft: "20px"}}>
                            Выйти
                        </Button>
                    </Link>



                </div>


            </div>
            {/*<AdminPanel/>*/}
        </>
    )
}
