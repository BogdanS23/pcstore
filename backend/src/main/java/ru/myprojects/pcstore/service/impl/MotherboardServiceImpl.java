package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.Motherboard;
import ru.myprojects.pcstore.repository.MotherboardRepository;
import ru.myprojects.pcstore.service.MotherboardService;

import java.util.List;

@Service
@AllArgsConstructor
public class MotherboardServiceImpl implements MotherboardService {
    private MotherboardRepository motherboardRepository;

    @Override
    public Motherboard createMotherboard(Motherboard motherboard) {
        return motherboardRepository.save(motherboard);
    }

    @Override
    public Motherboard getMotherboardById(Long motherboardId) {
        return motherboardRepository.findById(motherboardId).orElseThrow(() -> new RuntimeException("Не найдена такая материнская плата"));
    }

    @Override
    public List<Motherboard> getAllMotherboards() {
        return motherboardRepository.findAll();
    }

    @Override
    public Motherboard updateMotherboard(Long motherboardId, Motherboard updatedMotherboard) {
        Motherboard motherboard = motherboardRepository.findById(motherboardId).orElseThrow(() -> new RuntimeException("Не найдена такая материнская плата"));
        motherboard.setManufacturer(updatedMotherboard.getManufacturer());
        motherboard.setModel(updatedMotherboard.getModel());
        motherboard.setSocket(updatedMotherboard.getSocket());
        motherboard.setChipset(updatedMotherboard.getChipset());
        motherboard.setRam_type(updatedMotherboard.getRam_type());
        motherboard.setAmount_of_ram(updatedMotherboard.getAmount_of_ram());
        motherboard.setPrice(updatedMotherboard.getPrice());
        Motherboard updateMotherboardObj = motherboardRepository.save(motherboard);
        return updateMotherboardObj;
    }

    @Override
    public void deleteMotherboardById(Long motherboardId) {
        motherboardRepository.deleteById(motherboardId);
    }
}
