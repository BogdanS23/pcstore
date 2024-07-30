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
import { Button, Checkbox, Snackbar, Alert } from "@mui/material";
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
import AuthService from "../services/AuthService";
import { FilterProvider } from '../FilterContext';
import Login from "../components/Login.jsx";

export const ConfiguratorPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarOrder, setOpenSnackbarOrder] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const userId = AuthService.getUserId();
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    const storedProducts = localStorage.getItem(`selectedProducts_${userId}`);
    if (storedProducts) {
      setSelectedProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    const userId = AuthService.getUserId();
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    localStorage.setItem(`selectedProducts_${userId}`, JSON.stringify(selectedProducts));
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

  const handleRemoveProduct = (component) => {
    setSelectedProducts((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[component];
      return updatedState;
    });
    console.log(`Removed product from ${component}`);
  };

  const handleOrder = () => {
    const userId = AuthService.getUserId();
    if (!userId) {
      console.error("User not authenticated");
      setOpenSnackbar(true);
      return;
    }

    const pc = {
      pccase: selectedProducts.case ? selectedProducts.case : null,
      cooler: selectedProducts.cooler ? selectedProducts.cooler : null,
      graphicsCard: selectedProducts.GPU ? selectedProducts.GPU : null,
      motherboard: selectedProducts.motherboard ? selectedProducts.motherboard : null,
      powerSupply: selectedProducts.PSU ? selectedProducts.PSU : null,
      processor: selectedProducts.processor ? selectedProducts.processor : null,
      ram: selectedProducts.RAM ? selectedProducts.RAM : null,
      storageDevice: selectedProducts.storage ? selectedProducts.storage : null,
      pcType: checked ? "USER" : (Object.keys(selectedProducts).length === 8 ? "TEMP" : "IND_COMP"),
      userId: userId
    };

    axios.post("http://localhost:8080/api/pcs", pc)
        .then((response) => {
          console.log("Order submitted: ", response.data);
          localStorage.removeItem(`selectedProducts_${userId}`);
          setSelectedProducts({});
          const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
          cart.push(response.data);
          localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
          setOpenSnackbarOrder(true)
        })
        .catch((error) => {
          console.error("There was an error submitting the order!", error);
        });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setOpenSnackbarOrder(false);
  };

  return (
      <FilterProvider>
        <div className="configuration-page">
          <Header isConfiguratorPage />
          <div className="configur">
            <div className="configuration-grid">
              <ConfCard
                  title="Материнская плата"
                  inactiveImage={matplata}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.motherboard?.image}`}
                  onClick={() => handleCardClick("motherboard")}
                  onRemove={() => handleRemoveProduct("motherboard")}
                  selectedProductName={selectedProducts.motherboard?.manufacturer + " " + selectedProducts.motherboard?.model}
                  isSelected={!!selectedProducts.motherboard}
                  isActive={activeComponent === "motherboard"}
              />
              <ConfCard
                  title="Процессор"
                  inactiveImage={proc}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.processor?.image}`}
                  onClick={() => handleCardClick("processor")}
                  onRemove={() => handleRemoveProduct("processor")}
                  selectedProductName={selectedProducts.processor?.manufacturer + " " + selectedProducts.processor?.model}
                  isSelected={!!selectedProducts.processor}
                  isActive={activeComponent === "processor"}
              />
              <ConfCard
                  title="ОЗУ"
                  inactiveImage={ram}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.RAM?.image}`}
                  onClick={() => handleCardClick("RAM")}
                  onRemove={() => handleRemoveProduct("RAM")}
                  selectedProductName={selectedProducts.RAM?.manufacturer + " " + selectedProducts.RAM?.model}
                  isSelected={!!selectedProducts.RAM}
                  isActive={activeComponent === "RAM"}
              />
              <ConfCard
                  title="Видеокарта"
                  inactiveImage={graphics}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.GPU?.image}`}
                  onClick={() => handleCardClick("GPU")}
                  onRemove={() => handleRemoveProduct("GPU")}
                  selectedProductName={selectedProducts.GPU?.model}
                  isSelected={!!selectedProducts.GPU}
                  isActive={activeComponent === "GPU"}
              />
              <ConfCard
                  title="Блок питания"
                  inactiveImage={powersupply}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.PSU?.image}`}
                  onClick={() => handleCardClick("PSU")}
                  onRemove={() => handleRemoveProduct("PSU")}
                  selectedProductName={selectedProducts.PSU?.model}
                  isSelected={!!selectedProducts.PSU}
                  isActive={activeComponent === "PSU"}
              />
              <ConfCard
                  title="Корпус"
                  inactiveImage={scase}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.case?.image}`}
                  onClick={() => handleCardClick("case")}
                  onRemove={() => handleRemoveProduct("case")}
                  selectedProductName={selectedProducts.case?.model}
                  isSelected={!!selectedProducts.case}
                  isActive={activeComponent === "case"}
              />
              <ConfCard
                  title="Охлаждение"
                  inactiveImage={cooler}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.cooler?.image}`}
                  onClick={() => handleCardClick("cooler")}
                  onRemove={() => handleRemoveProduct("cooler")}
                  selectedProductName={selectedProducts.cooler?.model}
                  isSelected={!!selectedProducts.cooler}
                  isActive={activeComponent === "cooler"}
              />
              <ConfCard
                  title="Накопители"
                  inactiveImage={storage}
                  activeImage={`data:image/jpeg;base64,${selectedProducts.storage?.image}`}
                  onClick={() => handleCardClick("storage")}
                  onRemove={() => handleRemoveProduct("storage")}
                  selectedProductName={selectedProducts.storage?.model}
                  isSelected={!!selectedProducts.storage}
                  isActive={activeComponent === "storage"}
              />
            </div>

            {Object.keys(selectedProducts).length === 8 && (
                <div className="user-checkbox"> Сделать сборку пользовательской
                  <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
            )}

            <div className="orderButton">
              <Button
                  style={{ background: "green", width: "100%", fontSize: "20px" }}
                  variant="contained"
                  onClick={handleOrder}
              >
                Добавить в корзину
              </Button>
            </div>
            {activeComponent === "motherboard" && <MotherboardResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "processor" && <ProcessorResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "RAM" && <RAMResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "GPU" && <GPUResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "PSU" && <PSUResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "case" && <CaseResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "cooler" && <CoolerResultComponent onSelect={handleSelectProduct} />}
            {activeComponent === "storage" && <StorageResultComponent onSelect={handleSelectProduct} />}

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                Пожалуйста, авторизуйтесь для добавления в корзину.
              </Alert>
            </Snackbar>
            <Snackbar open={openSnackbarOrder} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                Товары добавлены в корзину!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </FilterProvider>
  );
};
