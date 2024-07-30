package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.Ram;

import java.util.List;

public interface RamService {
    Ram createRam(Ram ram);
    Ram getRamById(Long ramId);
    List<Ram> getAllRam();
    Ram updateRam(Long ramId, Ram updatedRam);
    void deleteRamById(Long ramId);
}
