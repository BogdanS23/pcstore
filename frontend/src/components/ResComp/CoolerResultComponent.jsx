import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import FilterContext from "../../FilterContext.jsx";

function CoolerResultComponent({ onSelect }) {
  const { selectedSocket, selected_TDP } = useContext(FilterContext);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [tdpRange, setTdpRange] = useState([0, 300]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSockets, setSelectedSockets] = useState(selectedSocket ? [selectedSocket] : []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/coolers")
        .then(response => {
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
  }, []);

  useEffect(() => {
    if (selectedSocket) {
      setSelectedSockets([selectedSocket]);
    }
  }, [selectedSocket]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleTdpChange = (event, newValue) => {
    setTdpRange(newValue);
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
        item.tdp >= tdpRange[0] && item.tdp <= tdpRange[1] &&
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(item.manufacturer)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(item.type)) &&
        (selectedSockets.length === 0 || item.compatibleSockets.some(socket => selectedSockets.includes(socket))) &&
        (selected_TDP ? item.tdp > selected_TDP : true)
    );
    setFilteredData(filtered);
  }, [priceRange, tdpRange, selectedManufacturers, selectedTypes, selectedSockets, data, selected_TDP]);

  const uniqueValues = (key) => [...new Set(data.flatMap(item => item[key]))];

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

                  <Typography gutterBottom>TDP</Typography>
                  <Slider
                      value={tdpRange}
                      onChange={handleTdpChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={300}
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

                  {/*<Typography gutterBottom>Тип кулера</Typography>*/}
                  {/*<FormControl component="fieldset">*/}
                  {/*  <FormGroup>*/}
                  {/*    {uniqueValues('type').map(type => (*/}
                  {/*        <FormControlLabel*/}
                  {/*            key={type}*/}
                  {/*            control={*/}
                  {/*              <Checkbox*/}
                  {/*                  checked={selectedTypes.includes(type)}*/}
                  {/*                  onChange={(e) => handleFilterChange(e, setSelectedTypes, selectedTypes)}*/}
                  {/*                  name={type}*/}
                  {/*              />*/}
                  {/*            }*/}
                  {/*            label={type}*/}
                  {/*        />*/}
                  {/*    ))}*/}
                  {/*  </FormGroup>*/}
                  {/*</FormControl>*/}

                  <Typography gutterBottom>Совместимые сокеты</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('compatibleSockets').map(socket => (
                          <FormControlLabel
                              key={socket}
                              control={
                                <Checkbox
                                    checked={selectedSockets.includes(socket)}
                                    onChange={(e) => handleFilterChange(e, setSelectedSockets, selectedSockets)}
                                    name={socket}
                                />
                              }
                              label={socket}
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
                    TDP: ${item.tdp}
                    Совместимые сокеты: ${item.compatibleSockets.join(', ')}
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

export default CoolerResultComponent;
