import React, { useState, useEffect } from "react";
import "../styles/ConfigurationPage.css";
import Header from "../components/Header.jsx";
import { ConfCard } from "../components/ConfCard.jsx";
import configureLogo from "../assets/configureLogo.png";
import matplata from "../assets/parts/matplata.svg";
import scase from "../assets/parts/case.svg";
import cooler from "../assets/parts/cooler.svg";
import graphics from "../assets/parts/graphics.svg";
import powersupply from "../assets/parts/powersupply.svg";
import proc from "../assets/parts/proc.svg";
import ram from "../assets/parts/ram.svg";
import storage from "../assets/parts/storage.svg";
import {Button, Checkbox} from "@mui/material";
import ResultComponent from "../components/ResComp/ResultComponent.jsx";
import ProcessorResultComponent from "../components/ResComp/ProcessorResultComponent.jsx";
import MotherboardResultComponent from "../components/ResComp/MotherboardResultComponent.jsx";
import CaseResultComponent from "../components/ResComp/CaseResultComponent.jsx";
import RAMResultComponent from "../components/ResComp/RAMResultComponent.jsx";
import GPUResultComponent from "../components/ResComp/GPUResultComponent.jsx";
import axios from "axios";
import PSUResultComponent from "../components/ResComp/PSUResultComponent.jsx";
import CoolerResultComponent from "../components/ResComp/CoolerResultComponent.jsx";
import StorageResultComponent from "../components/ResComp/StorageResultComponent.jsx";
import { FilterProvider } from '../FilterContext';

export const AdminConfigurator = ({ initialData, isEdit, onClose }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    //console.log(initialData);
    // const storedProducts = localStorage.getItem("selectedProducts");
    // if (storedProducts) {
    //   setSelectedProducts(JSON.parse(storedProducts));
    // } else
       if (initialData) {
      setSelectedProducts(initialData);

    }
  }, [initialData]);

  useEffect(() => {
    // console.log("PRODUCTS")
    // console.log(selectedProducts)
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleCardClick = (component) => {
    setActiveComponent(component);
    console.log(component);
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [activeComponent]: product,
    }));
    console.log(product);
    setActiveComponent(null);
  };

  const handleOrder = () => {
    const pc = {
      pccase: selectedProducts.pccase ? selectedProducts.pccase : null,
      cooler: selectedProducts.cooler ? selectedProducts.cooler : null,
      graphicsCard: selectedProducts.graphicsCard ? selectedProducts.graphicsCard : null,
      motherboard: selectedProducts.motherboard ? selectedProducts.motherboard : null,
      powerSupply: selectedProducts.powerSupply ? selectedProducts.powerSupply : null,
      processor: selectedProducts.processor ? selectedProducts.processor : null,
      ram: selectedProducts.ram ? selectedProducts.ram : null,
      storageDevice: selectedProducts.storageDevice ? selectedProducts.storageDevice : null,
      pcType: checked ? "USER" : (Object.keys(selectedProducts).length === 8 ? "TEMP" : "IND_COMP"),
      rating: selectedProducts.rating ? selectedProducts.rating : null,
    };

    axios.post("http://localhost:8080/api/pcs", pc)
        .then((response) => {
          console.log("Order submitted: ", response.data);
          localStorage.removeItem("selectedProducts");
          setSelectedProducts({});
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(response.data);
          localStorage.setItem("cart", JSON.stringify(cart));
        })
        .catch((error) => {
          console.error("There was an error submitting the order!", error);
        });
  };

  const handleEditPC = () => {
    const pc = {
      pccase: selectedProducts.pccase ? selectedProducts.pccase : null,
      cooler: selectedProducts.cooler ? selectedProducts.cooler : null,
      graphicsCard: selectedProducts.graphicsCard ? selectedProducts.graphicsCard : null,
      motherboard: selectedProducts.motherboard ? selectedProducts.motherboard : null,
      powerSupply: selectedProducts.powerSupply ? selectedProducts.powerSupply : null,
      processor: selectedProducts.processor ? selectedProducts.processor : null,
      ram: selectedProducts.ram ? selectedProducts.ram : null,
      storageDevice: selectedProducts.storageDevice ? selectedProducts.storageDevice : null,
      pcType: initialData.pcType ? initialData.pcType : null,
      rating: selectedProducts.rating,
    };
    console.log(selectedProducts)
    axios.put(`http://localhost:8080/api/pcs/${selectedProducts.id}`, pc)
        .then((response) => {
          console.log("Order submitted: ", response.data);
          localStorage.removeItem("selectedProducts");
          setSelectedProducts({});
        })
        .catch((error) => {
          console.error("There was an error submitting the order!", error);
        });
  };

  const handleRemoveProduct = (component) => {
    setSelectedProducts((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[component];
      return updatedState;
    });
    console.log(`Removed product from ${component}`);
  };

  return (
      <FilterProvider initialData={initialData}>
        <div className="configuration-page">
          <div className="configur">
            <div className="configuration-grid">
              <ConfCard
                  title="Материнская плата"
                  inactiveImage={matplata}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.motherboard?.image}`}
                  onClick={() => handleCardClick("motherboard")}
                  selectedProductName={selectedProducts.motherboard?.manufacturer + " " + selectedProducts.motherboard?.model}
                  isSelected={!!selectedProducts.motherboard}
                  isActive={activeComponent === "motherboard"}
                  onRemove={() => handleRemoveProduct("motherboard")}
              />
              <ConfCard
                  title="Процессор"
                  inactiveImage={proc}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.processor?.image}`}
                  onClick={() => handleCardClick("processor")}
                  selectedProductName={selectedProducts.processor?.manufacturer + " " + selectedProducts.processor?.model}
                  isSelected={!!selectedProducts.processor}
                  isActive={activeComponent === "processor"}
                  onRemove={() => handleRemoveProduct("processor")}
              />
              <ConfCard
                  title="ОЗУ"
                  inactiveImage={ram}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.ram?.image}`}
                  onClick={() => handleCardClick("ram")}
                  selectedProductName={selectedProducts.ram?.manufacturer + " " + selectedProducts.ram?.model}
                  isSelected={!!selectedProducts.ram}
                  isActive={activeComponent === "ram"}
                  onRemove={() => handleRemoveProduct("ram")}
              />
              <ConfCard
                  title="Видеокарта"
                  inactiveImage={graphics}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.graphicsCard?.image}`}
                  onClick={() => handleCardClick("graphicsCard")}
                  selectedProductName={selectedProducts.graphicsCard?.model}
                  isSelected={!!selectedProducts.graphicsCard}
                  isActive={activeComponent === "graphicsCard"}
                  onRemove={() => handleRemoveProduct("graphicsCard")}
              />
              <ConfCard
                  title="Блок питания"
                  inactiveImage={powersupply}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.powerSupply?.image}`}
                  onClick={() => handleCardClick("powerSupply")}
                  selectedProductName={selectedProducts.powerSupply?.model}
                  isSelected={!!selectedProducts.powerSupply}
                  isActive={activeComponent === "powerSupply"}
                  onRemove={() => handleRemoveProduct("powerSupply")}
              />
              <ConfCard
                  title="Корпус"
                  inactiveImage={scase}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.pccase?.image}`} // Активное изображение
                  onClick={() => handleCardClick("pccase")}
                  selectedProductName={selectedProducts.pccase?.model}
                  isSelected={!!selectedProducts.pccase}
                  isActive={activeComponent === "pccase"}
                  onRemove={() => handleRemoveProduct("pccase")}
              />

              <ConfCard
                  title="Охлаждение"
                  inactiveImage={cooler}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.cooler?.image}`}
                  onClick={() => handleCardClick("cooler")}
                  selectedProductName={selectedProducts.cooler?.model}
                  isSelected={!!selectedProducts.cooler}
                  isActive={activeComponent === "cooler"}
                  onRemove={() => handleRemoveProduct("cooler")}
              />
              <ConfCard
                  title="Накопители"
                  inactiveImage={storage}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.storageDevice?.image}`}
                  onClick={() => handleCardClick("storageDevice")}
                  selectedProductName={selectedProducts.storageDevice?.model}
                  isSelected={!!selectedProducts.storageDevice}
                  isActive={activeComponent === "storageDevice"}
                  onRemove={() => handleRemoveProduct("storageDevice")}
              />
            </div>

            {Object.keys(selectedProducts).length > 0 && (
                <div className="orderButton">
                  <Button
                      style={{background: "green", width: "100%", fontSize: "20px"}}
                      variant="contained"
                      onClick={() => {handleOrder(); onClose()}}
                  >
                    Добавить сборку
                  </Button>
                </div>
            )}
            {isEdit ? <div className="orderButton">
              <Button
                  style={{background: "green", width: "100%", fontSize: "20px"}}
                  variant="contained"
                  onClick={() => {handleEditPC(); onClose()}}
              >
                Сохранить сборку
              </Button>
            </div> : <></>}


            {activeComponent === "motherboard" && <MotherboardResultComponent onSelect={handleSelectProduct}/>}
            {activeComponent === "processor" && <ProcessorResultComponent onSelect={handleSelectProduct}/>}
            {activeComponent === "ram" && <RAMResultComponent onSelect={handleSelectProduct}/>}
            {activeComponent === "graphicsCard" && <GPUResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "powerSupply" && <PSUResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "pccase" && <CaseResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "cooler" && <CoolerResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "storageDevice" && <StorageResultComponent onSelect={handleSelectProduct} />}
          </div>
        </div>
      </FilterProvider>
  );
};
