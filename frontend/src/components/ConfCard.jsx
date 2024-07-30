import React from "react";
import "../styles/ConfCard.css";
import CloseIcon from "@mui/icons-material/Close";
import {Button, IconButton} from "@mui/material";

export const ConfCard = ({ title, inactiveImage, activeImage, onClick, onRemove, selectedProductName, isSelected, isActive }) => {
    return (
        <div className={`conf-card ${isSelected ? "selected" : isActive ? "active" : ""}`} onClick={onClick}>
            <div className="conf-card-content">
                {isSelected && (
                    <IconButton style={{color:"red", position: "absolute", top: "0", right:"10px"}} className="remove-button" onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}>
                        <CloseIcon/>
                    </IconButton>
                )}
                <div className="conf-card-title">{isSelected ? selectedProductName : title}</div>
                <div className="conf-card-image-wrapper">
                    <img src={isSelected ? activeImage : inactiveImage} alt="card_image" className="conf-card-image" />
                </div>
            </div>
        </div>
    );
};
