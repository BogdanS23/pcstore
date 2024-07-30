package ru.myprojects.pcstore.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import ru.myprojects.pcstore.entity.PC;
import ru.myprojects.pcstore.repository.PCRepository;
import ru.myprojects.pcstore.service.PCService;

import java.util.List;
import java.util.Optional;

@Service
public class PCServiceImpl implements PCService {

    @Autowired
    private PCRepository pcRepository;

    public List<PC> getAllPCs() {
        return pcRepository.findAll();
    }

    public PC getPCById(Long id) {
        return pcRepository.getReferenceById(id);
    }

    public PC updatePC(Long id, PC pcDetails) {
        PC pc = pcRepository.findById(id).orElseThrow(() -> new RuntimeException("Не найдена такая сборка!"));
        pc.setPccase(pcDetails.getPccase());
        pc.setCooler(pcDetails.getCooler());
        pc.setGraphicsCard(pcDetails.getGraphicsCard());
        pc.setMotherboard(pcDetails.getMotherboard());
        pc.setPowerSupply(pcDetails.getPowerSupply());
        pc.setProcessor(pcDetails.getProcessor());
        pc.setRam(pcDetails.getRam());
        pc.setStorageDevice(pcDetails.getStorageDevice());
        pc.setPcType(pcDetails.getPcType());
        pc.setRating(pcDetails.getRating());
        PC updatedPC = pcRepository.save(pc);
        return updatedPC;
    }

    public PC createPC(PC pc) {
        pc.setRating(0);
        return pcRepository.save(pc);
    }

    public void deletePC(Long id) {
        pcRepository.deleteById(id);
    }

    public PC updateRating(Long id, int ratingChange) {
        PC pc = pcRepository.findById(id).orElseThrow(() -> new RuntimeException("Не найдена такая сборка!"));
        pc.setRating(pc.getRating() + ratingChange);
        return pcRepository.save(pc);
    }
}

