import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";

function ResultComponent({ onSelect }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedPower, setSelectedPower] = useState([]);
  const [selectedEfficiency, setSelectedEfficiency] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/power-supplies")
        .then(response => {
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
  }, []);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterChange = (event, filterSetter, filterList) => {
    const value = event.target.name;
    const updatedList = event.target.checked
        ? [...filterList, value]
        : filterList.filter(item => item !== value);
    filterSetter(updatedList);
  };

  useEffect(() => {
    const filtered = data.filter(item =>
        item.price >= priceRange[0] && item.price <= priceRange[1] &&
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(item.manufacturer)) &&
        (selectedPower.length === 0 || selectedPower.includes(item.power.toString())) &&
        (selectedEfficiency.length === 0 || selectedEfficiency.includes(item.efficiency))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedPower, selectedEfficiency, data]);

  const uniqueValues = (key) => [...new Set(data.map(item => item[key]))];

  return (
      <section className="container">
        <div className="res-cont">
          <header className="mini-header"></header>
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
                      max={50000}
                  />

                  <Typography gutterBottom>Производитель</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('manufacturer').map(manufacturer => (
                          <FormControlLabel
                              key={manufacturer}
                              control={
                                <Checkbox
                                    checked={selectedManufacturers.includes(manufacturer)}
                                    onChange={(e) => handleFilterChange(e, setSelectedManufacturers, selectedManufacturers)}
                                    name={manufacturer}
                                />
                              }
                              label={manufacturer}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Мощность</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('power').map(power => (
                          <FormControlLabel
                              key={power}
                              control={
                                <Checkbox
                                    checked={selectedPower.includes(power.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedPower, selectedPower)}
                                    name={power.toString()}
                                />
                              }
                              label={`${power} W`}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  {/*<Typography gutterBottom>Сертификация эффективности</Typography>*/}
                  {/*<FormControl component="fieldset">*/}
                  {/*  <FormGroup>*/}
                  {/*    {uniqueValues('efficiency').map(efficiency => (*/}
                  {/*        <FormControlLabel*/}
                  {/*            key={efficiency}*/}
                  {/*            control={*/}
                  {/*              <Checkbox*/}
                  {/*                  checked={selectedEfficiency.includes(efficiency)}*/}
                  {/*                  onChange={(e) => handleFilterChange(e, setSelectedEfficiency, selectedEfficiency)}*/}
                  {/*                  name={efficiency}*/}
                  {/*              />*/}
                  {/*            }*/}
                  {/*            label={efficiency}*/}
                  {/*        />*/}
                  {/*    ))}*/}
                  {/*  </FormGroup>*/}
                  {/*</FormControl>*/}

                </div>
              </aside>
              <div className="filter-results">
                {filteredData.map(item => (
                    <ResultCard
                        key={item.id}
                        name={`${item.manufacturer} ${item.model}`}
                        price={item.price}
                        specs={`
                    Производитель: ${item.manufacturer}
                    Модель: ${item.model}
                    Мощность: ${item.power} W
                  `}
                        image={item.image}
                        onSelect={() => onSelect(item)}
                        buttonTitle="Выбрать"
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default ResultComponent;
