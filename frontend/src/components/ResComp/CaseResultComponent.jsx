import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "../ResultCard.jsx";
import "../../styles/ResultComponent.css";
import { Slider, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";

function CaseResultComponent({ onSelect }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/cases")
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
        (selectedFormFactors.length === 0 || selectedFormFactors.includes(item.form_factor)) &&
        (selectedColors.length === 0 || selectedColors.includes(item.color)) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(item.material))
    );
    setFilteredData(filtered);
  }, [priceRange, selectedManufacturers, selectedFormFactors, selectedColors, selectedMaterials, data]);

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
                      {uniqueValues('manufacturer').map((manufacturer, index) => (
                          <FormControlLabel
                              key={`manufacturer-${index}`}
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

                  {/*<Typography gutterBottom>Форм-фактор</Typography>*/}
                  {/*<FormControl component="fieldset">*/}
                  {/*  <FormGroup>*/}
                  {/*    {uniqueValues('form_factor').map((form_factor, index) => (*/}
                  {/*        <FormControlLabel*/}
                  {/*            key={`form_factor-${index}`}*/}
                  {/*            control={*/}
                  {/*              <Checkbox*/}
                  {/*                  checked={selectedFormFactors.includes(form_factor)}*/}
                  {/*                  onChange={(e) => handleFilterChange(e, setSelectedFormFactors, selectedFormFactors)}*/}
                  {/*                  name={form_factor}*/}
                  {/*              />*/}
                  {/*            }*/}
                  {/*            label={form_factor}*/}
                  {/*        />*/}
                  {/*    ))}*/}
                  {/*  </FormGroup>*/}
                  {/*</FormControl>*/}

                  {/*<Typography gutterBottom>Цвет</Typography>*/}
                  {/*<FormControl component="fieldset">*/}
                  {/*  <FormGroup>*/}
                  {/*    {uniqueValues('color').map((color, index) => (*/}
                  {/*        <FormControlLabel*/}
                  {/*            key={`color-${index}`}*/}
                  {/*            control={*/}
                  {/*              <Checkbox*/}
                  {/*                  checked={selectedColors.includes(color)}*/}
                  {/*                  onChange={(e) => handleFilterChange(e, setSelectedColors, selectedColors)}*/}
                  {/*                  name={color}*/}
                  {/*              />*/}
                  {/*            }*/}
                  {/*            label={color}*/}
                  {/*        />*/}
                  {/*    ))}*/}
                  {/*  </FormGroup>*/}
                  {/*</FormControl>*/}

                  {/*<Typography gutterBottom>Материал</Typography>*/}
                  {/*<FormControl component="fieldset">*/}
                  {/*  <FormGroup>*/}
                  {/*    {uniqueValues('material').map((material, index) => (*/}
                  {/*        <FormControlLabel*/}
                  {/*            key={`material-${index}`}*/}
                  {/*            control={*/}
                  {/*              <Checkbox*/}
                  {/*                  checked={selectedMaterials.includes(material)}*/}
                  {/*                  onChange={(e) => handleFilterChange(e, setSelectedMaterials, selectedMaterials)}*/}
                  {/*                  name={material}*/}
                  {/*              />*/}
                  {/*            }*/}
                  {/*            label={material}*/}
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

export default CaseResultComponent;
