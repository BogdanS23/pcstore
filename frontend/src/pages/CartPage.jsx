import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import "../styles/CartPage.css";
import {Alert, Button, Snackbar} from "@mui/material";
import axios from "axios";
import AuthService from "../services/AuthService";
import CartItemCard from "../components/CartItemCard.jsx";
import Login from "../components/Login.jsx";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [openSnackbarOrder, setOpenSnackbarOrder] = useState(false);

    useEffect(() => {
        const userId = AuthService.getUserId();
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        const storedCart = localStorage.getItem(`cart_${userId}`);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleRemoveItem = (index) => {
        const userId = AuthService.getUserId();
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    };

    const handleSnackbarClose = () => {
        setOpenSnackbarOrder(false);
    };

    const handleSubmitOrder = () => {
        const userId = AuthService.getUserId();
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        axios.post("http://localhost:8080/api/orders", { pcList: cart, userId })
            .then(response => {
                console.log("Order submitted: ", response.data);
                localStorage.removeItem(`cart_${userId}`);
                setCart([]);
                setOpenSnackbarOrder(true)
            })
            .catch(error => {
                console.error("There was an error submitting the order!", error);
            });
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, pc) => {
            return total + [
                pc.pccase?.price || 0,
                pc.cooler?.price || 0,
                pc.graphicsCard?.price || 0,
                pc.motherboard?.price || 0,
                pc.powerSupply?.price || 0,
                pc.processor?.price || 0,
                pc.ram?.price || 0,
                pc.storageDevice?.price || 0
            ].reduce((acc, price) => acc + price, 0);
        }, 0);
    };

    return (
        <>
            <Header isCartPage />
            <div className="cart-container">
                {/*<div className="cart-header">Моя корзина</div>*/}
                {cart.length > 0 ? (
                    <div className="cart-items">
                        {cart.map((pc, index) => (
                            <CartItemCard key={index} pc={pc} index={index} handleRemove={handleRemoveItem} />
                        ))}
                        <div style={{minHeight: "3px", background: "black"}}></div>
                        {cart.length > 0 && (
                            <div className="cart-total">
                                Общая стоимость: {calculateTotalPrice()} ₽
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="cart-items" style={{ justifyContent: "center", alignItems: "center", fontSize: "56px", fontFamily: 'silkscreen', color: "#9f9f9f" }}>
                        Ваша корзина пуста
                    </div>
                )}

                <Button
                    style={{ background: "green", width: "100%", fontSize: "20px" }}
                    variant="contained"
                    onClick={handleSubmitOrder}
                    disabled={cart.length === 0}
                >
                    Оформить заказ
                </Button>
            </div>
            <Snackbar open={openSnackbarOrder} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Ваш заказ отправлен! Можете увидеть его в ЛК
                </Alert>
            </Snackbar>
        </>
    );
};

export default CartPage;
