import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import FilterContext from "../../FilterContext.jsx";

function RamResultComponent({ onSelect }) {
  const { selectedTypeOfRAM, updateTypeOfRAM } = useContext(FilterContext);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [selectedRamTypes, setSelectedRamTypes] = useState(selectedTypeOfRAM ? [selectedTypeOfRAM] : []);
  const [selectedAmountsOfRam, setSelectedAmountsOfRam] = useState([]);
  const [selectedNumberOfModules, setSelectedNumberOfModules] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/rams")
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
        (selectedFrequencies.length === 0 || selectedFrequencies.includes(item.frequency.toString())) &&
        (selectedRamTypes.length === 0 || selectedRamTypes.includes(item.ram_type)) &&
        (selectedAmountsOfRam.length === 0 || selectedAmountsOfRam.includes(item.amount_of_ram.toString())) &&
        (selectedNumberOfModules.length === 0 || selectedNumberOfModules.includes(item.number_of_modules.toString()))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedFrequencies, selectedRamTypes, selectedAmountsOfRam, selectedNumberOfModules, data]);

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

                  <Typography gutterBottom>Частота</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('frequency').map(frequency => (
                          <FormControlLabel
                              key={frequency}
                              control={
                                <Checkbox
                                    checked={selectedFrequencies.includes(frequency.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedFrequencies, selectedFrequencies)}
                                    name={frequency.toString()}
                                />
                              }
                              label={frequency}
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

                  <Typography gutterBottom>Объем ОЗУ</Typography>
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

                  <Typography gutterBottom>Количество модулей</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('number_of_modules').map(number_of_modules => (
                          <FormControlLabel
                              key={number_of_modules}
                              control={
                                <Checkbox
                                    checked={selectedNumberOfModules.includes(number_of_modules.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedNumberOfModules, selectedNumberOfModules)}
                                    name={number_of_modules.toString()}
                                />
                              }
                              label={number_of_modules}
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
                   Частота: ${item.frequency}
                   Тип ОЗУ: ${item.ram_type}
                   Объем ОЗУ: ${item.amount_of_ram}
                   Количество модулей: ${item.number_of_modules}
                   `}
                        image={item.image}
                        onSelect={() => {
                          onSelect(item);
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

export default RamResultComponent;
