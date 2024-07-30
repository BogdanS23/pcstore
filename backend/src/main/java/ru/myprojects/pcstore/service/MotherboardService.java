package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.Motherboard;

import java.util.List;

public interface MotherboardService {
    Motherboard createMotherboard(Motherboard motherboard);
    Motherboard getMotherboardById(Long motherboardId);
    List<Motherboard> getAllMotherboards();
    Motherboard updateMotherboard(Long motherboardId, Motherboard updatedMotherboard);
    void deleteMotherboardById(Long motherboardId);
}
