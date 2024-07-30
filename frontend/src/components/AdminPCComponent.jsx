import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "./ResultCard.jsx";
import "../styles/ResultComponent.css";
import {Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography, Button, TextField} from "@mui/material";

function PCResultComponent({ onClose, initialData, isEdit }) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 300000]);
    const [tempCart, setTempCart] = useState([]);
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [userid, setUserid] = useState(null);

    const [selectedComponentTypes, setSelectedComponentTypes] = useState({
        pccase: [],
        cooler: [],
        graphicsCard: [],
        motherboard: [],
        powerSupply: [],
        processor: [],
        ram: [],
        storageDevice: [],
        pcType: [],
        rating: [],
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/pcs")
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    useEffect(() => {
        console.log("----------");
        console.log(initialData)
        console.log("----------");
        if (initialData) {
            const temp = [...tempCart];
            initialData.pcList.map((pc) => {temp.push(pc)})
            //temp.push(initialData.pcList);
            // console.log(temp)
            setTempCart(temp);
            setUserid(initialData.userId)
            // console.log(tempCart)
        }
    }, [])

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

            const matchesPrice = priceSum >= priceRange[0] && priceSum <= priceRange[1];

            const matchesFilters = Object.keys(selectedComponentTypes).every(componentType => {
                if (selectedComponentTypes[componentType].length === 0) {
                    return true;
                }

                if (componentType === "pcType") {
                    return selectedComponentTypes[componentType].includes(pc[componentType]);
                }

                return selectedComponentTypes[componentType].includes(
                    pc[componentType]?.manufacturer + " " + pc[componentType]?.model
                );
            });

            return matchesPrice && matchesFilters;
        });

        setFilteredData(filtered);
    }, [priceRange, selectedComponentTypes, data]);

    const uniqueValues = (key) => {
        return [...new Set(data.flatMap(pc => pc[key] ? [pc[key].manufacturer + " " + pc[key].model] : []))];
    };

    const uniquePcTypes = () => {
        return [...new Set(data.map(pc => pc.pcType).filter(Boolean))];
    };

    const handleAddToCart = (pc) => {
        if (pc) {
            const temp = [...tempCart];
            temp.push(pc);
            setTempCart(temp);
            console.log("Added to tempcart: ", pc);
        }
    };

    const handleRemoveFromCart = (pc) => {
        if (pc) {
            const temp = tempCart.filter(item => item.id !== pc.id);
            setTempCart(temp);
            console.log("Removed from tempcart: ", pc);
        }
    };

    const handleAddOrder = () => {
        axios.post("http://localhost:8080/api/orders", { pcList: tempCart, userId: userid })
            .then(response => {
                console.log("Order submitted: ", response.data);
                setTempCart([]);
            })
            .catch(error => {
                console.error("There was an error submitting the order!", error);
            });
    };

    const handleSaveOrder = () => {
        console.log("123")
        console.log(initialData)
        axios.put(`http://localhost:8080/api/orders/${initialData.id}`, { pcList: tempCart, userId: userid, status: initialData.status })
            .then(response => {
                console.log("Order submitted: ", response.data);
                setTempCart([]);
            })
            .catch(error => {
                console.error("There was an error submitting the order!", error);
            });
    };


    const isItemSelected = (pc) => {
        return tempCart.some(item => item.id === pc.id);
    };

    return (
        <section className="container" style={{width:"100%"}}>
            <div className="res-cont">
                <header className="mini-header" style={{ display: "flex", justifyContent: "center" }}></header>
                {tempCart.length > 0 ? <div className="tempcart">Выбрано: {tempCart.map((pc) => "PC id-" + pc.id + ", ")}</div> : <></>}


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

                                {["pccase", "cooler", "graphicsCard", "motherboard", "powerSupply", "processor", "ram", "storageDevice", "rating"].map(componentType => (
                                    <div key={componentType}>
                                        <Typography
                                            gutterBottom>{componentType.charAt(0).toUpperCase() + componentType.slice(1)}</Typography>
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

                                <div>
                                    <Typography gutterBottom>Тип ПК</Typography>
                                    <FormControl component="fieldset">
                                        <FormGroup>
                                            {uniquePcTypes().map(value => (
                                                <FormControlLabel
                                                    key={value}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedComponentTypes.pcType.includes(value)}
                                                            onChange={(e) => handleFilterChange(e, "pcType")}
                                                            name={value}
                                                        />
                                                    }
                                                    label={value}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                </div>
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

                                const specsWithType = `PC Type: ${pc.pcType}\n${specs}`;

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
                                        specs={specsWithType}
                                        image={pc.image ? pc.image : pc.pccase ? pc.pccase.image : undefined}
                                        onSelect={isItemSelected(pc) ? () => handleRemoveFromCart(pc) : () => handleAddToCart(pc)}
                                        buttonTitle={isItemSelected(pc) ? "Выбрано" : "В корзину"}
                                        isSelected={isItemSelected(pc)}
                                        onMouseEnter={() => setHoveredItemId(pc.id)}
                                        onMouseLeave={() => setHoveredItemId(null)}
                                        isHovered={hoveredItemId === pc.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div style={{display: "flex", width: "100%"}}>
                        <div style={{width: "35%", margin: "10px"}}>
                            <TextField
                                fullWidth="100%"
                            // required
                            id="outlined-required"
                            label="UserId"
                            value={userid}
                            onChange={(e) => { setUserid(e.target.value) }}
                        />
                        </div>
                        {isEdit ? <div style={{width: "75%", margin: "10px"}}>
                                <Button
                                    style={{background: "green", width: "100%", fontSize: "24px"}}
                                    variant="contained"
                                    onClick={() => {
                                        handleSaveOrder();
                                        onClose()
                                    }}
                                >
                                    Сохранить
                                </Button>
                            </div> :
                            <div style={{width: "75%", margin: "10px"}}>
                                <Button
                                    style={{background: "green", width: "100%", fontSize: "24px"}}
                                    variant="contained"
                                    onClick={() => {
                                        handleAddOrder();
                                        onClose()
                                    }}
                                >
                                    Добавить
                                </Button>
                            </div>
                        }


                    </div>

                </div>
            </div>
        </section>
    );
}

export default PCResultComponent;
