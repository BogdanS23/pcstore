package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.Cooler;

import java.util.List;

public interface CoolerService {
    Cooler createCooler(Cooler cooler);
    Cooler getCoolerById(Long coolerId);
    List<Cooler> getAllCooler();
    Cooler updateCooler(Long coolerId, Cooler updateCooler);

    void deleteCoolerById(Long coolerId);
}
