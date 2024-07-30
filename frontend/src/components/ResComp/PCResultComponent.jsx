import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import {
    Slider,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Typography,
    Button,
    styled,
    Alert, Snackbar
} from "@mui/material";
import Cookies from "js-cookie";
import AuthService from "../../services/AuthService.jsx";

function PCResultComponent() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 300000]);
    const [type, setType] = useState("FOR_SALE");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbarOrder, setOpenSnackbarOrder] = useState(false);
    const [selectedComponentTypes, setSelectedComponentTypes] = useState({
        pccase: [],
        cooler: [],
        graphicsCard: [],
        motherboard: [],
        powerSupply: [],
        processor: [],
        ram: [],
        storageDevice: [],
        rating: []
    });

    useEffect(() => {
        if (type) {
            axios.get("http://localhost:8080/api/pcs")
                .then(response => {
                    const filteredByType = response.data.filter(pc => pc.pcType === type);
                    setData(filteredByType);
                    setFilteredData(filteredByType);
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                });
        } else {
            setData([]);
            setFilteredData([]);
        }
    }, [type]);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleFilterChange = (event, componentType) => {
        const value = event.target.name;
        const updatedList = event.target.checked
            ? [...selectedComponentTypes[componentType], value]
            : selectedComponentTypes[componentType].filter(item => item !== value);

        setSelectedComponentTypes({
            ...selectedComponentTypes,
            [componentType]: updatedList
        });
    };

    useEffect(() => {
        const filtered = data.filter(pc => {
            const priceSum = Object.keys(pc).reduce((sum, key) => {
                if (pc[key] && pc[key].price) {
                    return sum + pc[key].price;
                }
                return sum;
            }, 0);

            return priceSum >= priceRange[0] && priceSum <= priceRange[1] &&
                Object.keys(selectedComponentTypes).every(componentType =>
                    selectedComponentTypes[componentType].length === 0 ||
                    selectedComponentTypes[componentType].includes(pc[componentType]?.manufacturer + " " + pc[componentType]?.model)
                );
        });

        setFilteredData(filtered);
    }, [priceRange, selectedComponentTypes, data]);

    const uniqueValues = (key) => {
        return [...new Set(data.flatMap(pc => pc[key] ? [pc[key].manufacturer + " " + pc[key].model] : []))];
    };

    const handleAddToCart = (pc) => {
        const userId = AuthService.getUserId();
        if (!userId) {
            console.error("User not authenticated");
            setOpenSnackbar(true);
            return;
        }

        if (pc) {
            const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
            cart.push(pc);
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
            console.log("Added to cart: ", pc);
            setOpenSnackbarOrder(true)
        }
    };

    const handleVote = (pcId, ratingChange) => {
        axios.post(`/api/pcs/${pcId}/rate`, { ratingChange })
            .then(response => {
                const updatedPC = response.data;
                setData(prevData => prevData.map(pc => pc.id === pcId ? updatedPC : pc));
                setFilteredData(prevFilteredData => prevFilteredData.map(pc => pc.id === pcId ? updatedPC : pc));
                Cookies.set(`vote-${pcId}`, ratingChange, { expires: 365 });
            })
            .catch(error => {
                console.error('Error updating rating:', error);
            });
    };

    const CustomButton = styled(Button)(({ selected }) => ({
        backgroundColor: selected ? "lightgray" : "black",
        fontSize: "20px",
        color: selected ? "black" : "white",
        paddingRight: "70px",
        paddingLeft: "70px",
        '&:hover': {
            backgroundColor: selected ? "lightgray" : "darkgray",
            color: "black"
        }
    }));

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        setOpenSnackbarOrder(false);
    };

    return (
        <section className="container">
            <div className="res-cont">
                <header className="mini-header" style={{ display: "flex", justifyContent: "center" }}>
                    <CustomButton
                        onClick={() => setType("FOR_SALE")}
                        selected={type === "FOR_SALE"}
                    >
                        Готовые
                    </CustomButton>
                    <CustomButton
                        onClick={() => setType("USER")}
                        selected={type === "USER"}
                    >
                        Пользовательские
                    </CustomButton>
                </header>

                <div className="content">
                    <div className="filters">
                        <aside className="filter-column">
                            <div className="filter-box">
                                <div className="filter-title">ФИЛЬТРЫ</div>

                                <Typography gutterBottom>Цена</Typography>
                                <Slider
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={300000}
                                />

                                {["pccase", "cooler", "graphicsCard", "motherboard", "powerSupply", "processor", "ram", "storageDevice"].map(componentType => (
                                    <div key={componentType}>
                                        <Typography gutterBottom>{componentType.charAt(0).toUpperCase() + componentType.slice(1)}</Typography>
                                        <FormControl component="fieldset">
                                            <FormGroup>
                                                {uniqueValues(componentType).map(value => (
                                                    <FormControlLabel
                                                        key={value}
                                                        control={
                                                            <Checkbox
                                                                checked={selectedComponentTypes[componentType].includes(value)}
                                                                onChange={(e) => handleFilterChange(e, componentType)}
                                                                name={value}
                                                            />
                                                        }
                                                        label={value}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                ))}
                            </div>
                        </aside>
                        <div className="filter-results">
                            {filteredData.map(pc => {
                                const specs = Object.keys(pc).map(key => {
                                    if (pc[key] && pc[key].manufacturer && pc[key].model) {
                                        return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${pc[key].manufacturer} ${pc[key].model}`;
                                    }
                                    return null;
                                }).filter(Boolean).join("\n");

                                return (
                                    <ResultCard
                                        key={pc.id}
                                        name={`PC ${pc.id}`}
                                        price={Object.keys(pc).reduce((sum, key) => {
                                            if (pc[key] && pc[key].price) {
                                                return sum + pc[key].price;
                                            }
                                            return sum;
                                        }, 0)}
                                        specs={specs}
                                        image={pc.image ? pc.image : pc.pccase ? pc.pccase.image : undefined}
                                        onSelect={() => handleAddToCart(pc)}
                                        buttonTitle="В корзину"
                                        initialRating={pc.rating}
                                        pcId={pc.id}
                                        handleVote={handleVote}
                                        ratingOn={AuthService.getUsername()}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                    Пожалуйста, авторизуйтесь для добавления в корзину.
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackbarOrder} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Товары добавлены в корзину!
                </Alert>
            </Snackbar>
        </section>
    );
}

export default PCResultComponent;
