import React, { createContext, useState, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children, initialData }) => {
    const [selectedSocket, setSelectedSocket] = useState("");
    const [selectedTypeOfRAM, setSelectedTypeOfRAM] = useState("");
    const [selectedTDP, setSelectedTDP] = useState("");

    useEffect(() => {
        if (initialData) {
            setSelectedSocket(initialData.motherboard?.socket || "");
            setSelectedTypeOfRAM(initialData.ram?.ram_type || "");
            setSelectedTDP(initialData.processor?.tdp || "");
        }
    }, [initialData]);

    const updateSocket = (socket) => {
        setSelectedSocket(socket);
    };

    const updateTypeOfRAM = (typeOfRAM) => {
        setSelectedTypeOfRAM(typeOfRAM);
    };

    const updateTDP = (tdp) => {
        setSelectedTDP(tdp);
    };

    return (
        <FilterContext.Provider value={{ selectedSocket, updateSocket, selectedTypeOfRAM, updateTypeOfRAM, selectedTDP, updateTDP }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
