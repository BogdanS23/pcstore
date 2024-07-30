import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import FilterContext from "../../FilterContext.jsx";

function ProcessorResultComponent({ onSelect }) {
  const { selectedSocket, updateSocket } = useContext(FilterContext);
  const { selectedTypeOfRAM, updateTypeOfRAM } = useContext(FilterContext);
  const { updateTDP } = useContext(FilterContext);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedSockets, setSelectedSockets] = useState(selectedSocket ? [selectedSocket] : []);
  const [selectedRamTypes, setSelectedRamTypes] = useState(selectedTypeOfRAM ? [selectedTypeOfRAM] : []);
  const [selectedCores, setSelectedCores] = useState([]);
  const [selectedThreads, setSelectedThreads] = useState([]);
  const [selectedTDP, setSelectedTDP] = useState( []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/processors")
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
        (selectedRamTypes.length === 0 || selectedRamTypes.includes(item.ram_type)) &&
        (selectedCores.length === 0 || selectedCores.includes(item.number_of_cores.toString())) &&
        (selectedThreads.length === 0 || selectedThreads.includes(item.number_of_threads.toString())) &&
        (selectedTDP.length === 0 || selectedTDP.includes(item.tdp.toString()))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedSockets, selectedRamTypes, selectedCores, selectedThreads, selectedTDP, data]);

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

                  <Typography gutterBottom>Количество ядер</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('number_of_cores').map(number_of_cores => (
                          <FormControlLabel
                              key={number_of_cores}
                              control={
                                <Checkbox
                                    checked={selectedCores.includes(number_of_cores.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedCores, selectedCores)}
                                    name={number_of_cores.toString()}
                                />
                              }
                              label={number_of_cores}
                          />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <Typography gutterBottom>Количество потоков</Typography>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {uniqueValues('number_of_threads').map(number_of_threads => (
                          <FormControlLabel
                              key={number_of_threads}
                              control={
                                <Checkbox
                                    checked={selectedThreads.includes(number_of_threads.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedThreads, selectedThreads)}
                                    name={number_of_threads.toString()}
                                />
                              }
                              label={number_of_threads}
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
                                    checked={selectedTDP.includes(tdp.toString())}
                                    onChange={(e) => handleFilterChange(e, setSelectedTDP, selectedTDP)}
                                    name={tdp.toString()}
                                />
                              }
                              label={tdp}
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
                   Количество ядер: ${item.number_of_cores}
                   Количество потоков: ${item.number_of_threads}
                   Частота: ${item.frequency}
                   Тип ОЗУ: ${item.ram_type}
                   TDP: ${item.tdp}
                   `}
                        image={item.image}
                        onSelect={() => {
                          onSelect(item);
                          updateSocket(item.socket); // Обновляем сокет в контексте при выборе
                          updateTypeOfRAM(item.ram_type)
                          updateTDP(item.tdp)
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

export default ProcessorResultComponent;
