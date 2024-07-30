// src/components/CartItemCard.jsx
import React from 'react';
import "../styles/CartItemCard.css";
import { Button } from "@mui/material";

const CartItemCard = ({ pc, index, handleRemove }) => {
    const totalPrice = [
        pc.pccase?.price || 0,
        pc.cooler?.price || 0,
        pc.graphicsCard?.price || 0,
        pc.motherboard?.price || 0,
        pc.powerSupply?.price || 0,
        pc.processor?.price || 0,
        pc.ram?.price || 0,
        pc.storageDevice?.price || 0
    ].reduce((acc, price) => acc + price, 0);

    return (
        <div className="cart-item-card">
            <div className="cart-item-card-header">
                {pc.pcType === "IND_COMP" ? "Комплектующие" : (pc.pcType === "USER" ? "Пользовательская сборка" : "Сборка")}
                <Button
                    style={{ marginLeft: "auto", background: "red", color: "white" }}
                    variant="contained"
                    onClick={() => handleRemove(index)}
                >
                    Удалить
                </Button>
            </div>

            <div className="cart-item-card-body">
                {pc.pccase ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Корпус: " + pc.pccase.manufacturer + " " + pc.pccase.model}</div><div>{pc.pccase.price} ₽</div></div> : null}
                {pc.cooler ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Охлаждение: " + pc.cooler.manufacturer + " " + pc.cooler.model}</div><div>{pc.cooler.price} ₽</div></div> : null}
                {pc.graphicsCard ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Видеокарта: " + pc.graphicsCard.manufacturer + " " + pc.graphicsCard.model}</div><div>{pc.graphicsCard.price} ₽</div></div> : null}
                {pc.motherboard ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Материнская плата: " + pc.motherboard.manufacturer + " " + pc.motherboard.model}</div><div>{pc.motherboard.price} ₽</div></div> : null}
                {pc.powerSupply ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Блок питания: " + pc.powerSupply.manufacturer + " " + pc.powerSupply.model}</div><div>{pc.powerSupply.price} ₽</div></div> : null}
                {pc.processor ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Процессор: " + pc.processor.manufacturer + " " + pc.processor.model}</div><div>{pc.processor.price} ₽</div></div> : null}
                {pc.ram ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"ОЗУ: " + pc.ram.manufacturer + " " + pc.ram.model}</div><div>{pc.ram.price} ₽</div></div> : null}
                {pc.storageDevice ? <div style={{display:"flex", justifyContent:"space-between"}}><div>{"Накопитель: " + pc.storageDevice.manufacturer + " " + pc.storageDevice.model}</div><div>{pc.storageDevice.price} ₽</div></div> : null}
            </div>
            <div style={{minHeight:"2px", background:"black", margin:"7px"}}></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:"20px"}}><div style={{fontWeight: "bold"}}>Стоимость:</div> <div>{totalPrice} ₽</div></div>
        </div>
    );
};

export default CartItemCard;
