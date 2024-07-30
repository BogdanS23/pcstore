import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthService from "../services/AuthService.jsx";

const ResultCard = ({ name, image, price, specs, onSelect, buttonTitle, isSelected, onMouseEnter, onMouseLeave, isHovered, initialRating, pcId, ratingOn }) => {
    const [rating, setRating] = useState(initialRating);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        const storedVote = Cookies.get(`vote-${AuthService.getUserId()}-${pcId}`);
        if (storedVote) {
            setUserVote(parseInt(storedVote));
        }
    }, [pcId]);

    const handleVote = (ratingChange) => {
        axios.post(`http://localhost:8080/api/pcs/${pcId}/rate`, { ratingChange })
            .then(response => {
                setRating(response.data.rating);
                setUserVote(ratingChange);
                Cookies.set(`vote-${AuthService.getUserId()}-${pcId}`, ratingChange, { expires: 365 });
            })
            .catch(error => {
                console.error('Error updating rating:', error);
            });
    };

    return (
        <>
            <article className="result-card">
                <div className="result-content">
                    <div className="result-details">
                        <div className="result-image">
                            <img
                                loading="lazy"
                                src={`data:image/jpeg;base64,${image}`}
                                alt={`картинка`}
                            />
                        </div>
                        <div className="result-info">
                            <div className="result-title">
                                <div className="name-price">
                                    <span className="result-name">{name}</span>
                                    <span className="result-price">{price} ₽</span>
                                </div>
                                <span className="result-specs">{specs}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="result-actions">
                    <Button
                        variant="contained"
                        className="select-button"
                        onClick={onSelect}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        style={{ backgroundColor: isSelected ? "gray" : "" }}
                    >
                        {isSelected && isHovered ? "Удалить" : buttonTitle}
                    </Button>
                    {ratingOn &&
                    <div className="rating-control">
                        <IconButton
                            onClick={() => handleVote(1)}
                            disabled={userVote === 1}
                            style={{ color: userVote === 1 ? 'green' : 'default' }}
                        >
                            <ArrowUpwardIcon />
                        </IconButton>
                        <div>{rating}</div>
                        <IconButton
                            onClick={() => handleVote(-1)}
                            disabled={userVote === -1}
                            style={{ color: userVote === -1 ? 'red' : 'default' }}
                        >
                            <ArrowDownwardIcon />
                        </IconButton>
                    </div>}
                </div>
            </article>
        </>
    );
};

export default ResultCard;
