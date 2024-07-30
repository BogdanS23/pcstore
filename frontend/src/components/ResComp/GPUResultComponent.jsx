import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";

function GraphicsCardResultComponent({ onSelect }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedGpuFrequencies, setSelectedGpuFrequencies] = useState([]);
  const [selectedMemoryTypes, setSelectedMemoryTypes] = useState([]);
  const [selectedAmountsOfMemory, setSelectedAmountsOfMemory] = useState([]);
  const [selectedTDPs, setSelectedTDPs] = useState([]);
  const [selectedPcieVersions, setSelectedPcieVersions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/graphics-cards")
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
        (selectedVendors.length === 0 || selectedVendors.includes(item.vendor)) &&
        (selectedGpuFrequencies.length === 0 || selectedGpuFrequencies.includes(item.gpu_frequency.toString())) &&
        (selectedMemoryTypes.length === 0 || selectedMemoryTypes.includes(item.memory_type)) &&
        (selectedAmountsOfMemory.length === 0 || selectedAmountsOfMemory.includes(item.amount_of_memory.toString())) &&
        (selectedTDPs.length === 0 || selectedTDPs.includes(item.tdp.toString())) &&
        (selectedPcieVersions.length === 0 || selectedPcieVersions.includes(item.pcie_version))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedVendors, selectedGpuFrequencies, selectedMemoryTypes, selectedAmountsOfMemory, selectedTDPs, selectedPcieVersions, data]);

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
                      max={300000}
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

                  <Typography gutterBottom>Вендор</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('vendor').map(vendor => (
                          <FormControlLabel
                              key={vendor}
                              control={
                                <Checkbox
                                    checked={selectedVendors.includes(vendor)}
                                    onChange={(e) => handleFilterChange(e, setSelectedVendors, selectedVendors)}
                                    name={vendor}
                                />
                              }
                              label={vendor}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Частота GPU</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('gpu_frequency').map(frequency => (
                          <FormControlLabel
                              key={frequency}
                              control={
                                <Checkbox
                                    checked={selectedGpuFrequencies.includes(frequency.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedGpuFrequencies, selectedGpuFrequencies)}
                                    name={frequency.toString()}
                                />
                              }
                              label={frequency}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Тип памяти</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('memory_type').map(memory_type => (
                          <FormControlLabel
                              key={memory_type}
                              control={
                                <Checkbox
                                    checked={selectedMemoryTypes.includes(memory_type)}
                                    onChange={(e) => handleFilterChange(e, setSelectedMemoryTypes, selectedMemoryTypes)}
                                    name={memory_type}
                                />
                              }
                              label={memory_type}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Объем памяти</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('amount_of_memory').map(amount_of_memory => (
                          <FormControlLabel
                              key={amount_of_memory}
                              control={
                                <Checkbox
                                    checked={selectedAmountsOfMemory.includes(amount_of_memory.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedAmountsOfMemory, selectedAmountsOfMemory)}
                                    name={amount_of_memory.toString()}
                                />
                              }
                              label={`${amount_of_memory} GB`}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>TDP</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('tdp').map(tdp => (
                          <FormControlLabel
                              key={tdp}
                              control={
                                <Checkbox
                                    checked={selectedTDPs.includes(tdp.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedTDPs, selectedTDPs)}
                                    name={tdp.toString()}
                                />
                              }
                              label={`${tdp} W`}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Версия PCI-E</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('pcie_version').map(pcie_version => (
                          <FormControlLabel
                              key={pcie_version}
                              control={
                                <Checkbox
                                    checked={selectedPcieVersions.includes(pcie_version)}
                                    onChange={(e) => handleFilterChange(e, setSelectedPcieVersions, selectedPcieVersions)}
                                    name={pcie_version}
                                />
                              }
                              label={pcie_version}
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
                   Вендор: ${item.vendor}
                   Частота GPU: ${item.gpu_frequency}
                   Тип памяти: ${item.memory_type}
                   Объем памяти: ${item.amount_of_memory}
                   TDP: ${item.tdp}
                   Версия PCI-E: ${item.pcie_version}
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

export default GraphicsCardResultComponent;
