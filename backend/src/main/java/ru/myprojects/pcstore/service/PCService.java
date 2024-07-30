package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.PC;

import java.util.List;

public interface PCService {
    List<PC> getAllPCs();
    PC getPCById(Long id);
    PC updatePC(Long id, PC pcDetails);
    PC createPC(PC pc);
    void deletePC(Long id);

    PC updateRating(Long id, int ratingChange);
}
