// src/components/ResultComponent.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FilterContext from "../../FilterContext.jsx";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";

function ResultComponent({ onSelect }) {
  const { selectedSocket, updateSocket } = useContext(FilterContext);
  const { selectedTypeOfRAM, updateTypeOfRAM } = useContext(FilterContext);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedSockets, setSelectedSockets] = useState(selectedSocket ? [selectedSocket] : []);
  const [selectedChipsets, setSelectedChipsets] = useState([]);
  const [selectedRamTypes, setSelectedRamTypes] = useState(selectedTypeOfRAM ? [selectedTypeOfRAM] : []);
  const [selectedAmountsOfRam, setSelectedAmountsOfRam] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/motherboards")
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

    if (filterSetter === setSelectedSockets && event.target.checked) {
      updateSocket(value);
    }
  };

  useEffect(() => {
    const filtered = data.filter(item =>
        item.price >= priceRange[0] && item.price <= priceRange[1] &&
        (selectedManufacturers.length === 0 || selectedManufacturers.includes(item.manufacturer)) &&
        (selectedSockets.length === 0 || selectedSockets.includes(item.socket)) &&
        (selectedChipsets.length === 0 || selectedChipsets.includes(item.chipset)) &&
        (selectedRamTypes.length === 0 || selectedRamTypes.includes(item.ram_type)) &&
        (selectedAmountsOfRam.length === 0 || selectedAmountsOfRam.includes(item.amount_of_ram.toString()))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedSockets, selectedChipsets, selectedRamTypes, selectedAmountsOfRam, data]);

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

                  <Typography gutterBottom>Сокет</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('socket').map(socket => (
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

                  <Typography gutterBottom>Чипсет</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('chipset').map(chipset => (
                          <FormControlLabel
                              key={chipset}
                              control={
                                <Checkbox
                                    checked={selectedChipsets.includes(chipset)}
                                    onChange={(e) => handleFilterChange(e, setSelectedChipsets, selectedChipsets)}
                                    name={chipset}
                                />
                              }
                              label={chipset}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Тип ОЗУ</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('ram_type').map(ram_type => (
                          <FormControlLabel
                              key={ram_type}
                              control={
                                <Checkbox
                                    checked={selectedRamTypes.includes(ram_type)}
                                    onChange={(e) => handleFilterChange(e, setSelectedRamTypes, selectedRamTypes)}
                                    name={ram_type}
                                />
                              }
                              label={ram_type}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Макс. ОЗУ</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('amount_of_ram').map(amount_of_ram => (
                          <FormControlLabel
                              key={amount_of_ram}
                              control={
                                <Checkbox
                                    checked={selectedAmountsOfRam.includes(amount_of_ram.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedAmountsOfRam, selectedAmountsOfRam)}
                                    name={amount_of_ram.toString()}
                                />
                              }
                              label={`${amount_of_ram} GB`}
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
                    Сокет: ${item.socket}
                    Чипсет: ${item.chipset}
                    Тип ОЗУ: ${item.ram_type}
                    Макс. ОЗУ: ${item.amount_of_ram}
                  `}
                        image={item.image}
                        onSelect={() => {
                          onSelect(item);
                          updateSocket(item.socket);// Обновляем сокет в контексте при выборе
                          updateTypeOfRAM(item.ram_type)
                        }}
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
