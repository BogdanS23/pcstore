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
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/storage-devices")
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
        (selectedTypes.length === 0 || selectedTypes.includes(item.type)) &&
        (selectedCapacities.length === 0 || selectedCapacities.includes(item.capacity.toString()))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedTypes, selectedCapacities, data]);

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

                  <Typography gutterBottom>Тип</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('type').map(type => (
                          <FormControlLabel
                              key={type}
                              control={
                                <Checkbox
                                    checked={selectedTypes.includes(type)}
                                    onChange={(e) => handleFilterChange(e, setSelectedTypes, selectedTypes)}
                                    name={type}
                                />
                              }
                              label={type}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Емкость</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('capacity').map(capacity => (
                          <FormControlLabel
                              key={capacity}
                              control={
                                <Checkbox
                                    checked={selectedCapacities.includes(capacity.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedCapacities, selectedCapacities)}
                                    name={capacity.toString()}
                                />
                              }
                              label={`${capacity} GB`}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

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
                    Тип: ${item.type}
                    Емкость: ${item.capacity} GB
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
