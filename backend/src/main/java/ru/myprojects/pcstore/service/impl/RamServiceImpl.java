package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.Ram;
import ru.myprojects.pcstore.repository.RamRepository;
import ru.myprojects.pcstore.service.RamService;

import java.util.List;

@Service
@AllArgsConstructor
public class RamServiceImpl implements RamService {

    private RamRepository ramRepository;

    @Override
    public Ram createRam(Ram ram) {
        return ramRepository.save(ram);
    }

    @Override
    public Ram getRamById(Long ramId) {
        return ramRepository.findById(ramId).orElseThrow(() -> new RuntimeException("Не найдет такую память"));
    }

    @Override
    public List<Ram> getAllRam() {
        return ramRepository.findAll();
    }

    @Override
    public Ram updateRam(Long ramId, Ram updatedRam) {
        Ram ram = ramRepository.findById(ramId).orElseThrow(() -> new RuntimeException("Не найдет такую память"));
        ram.setManufacturer(updatedRam.getManufacturer());
        ram.setModel(updatedRam.getModel());
        ram.setFrequency(updatedRam.getFrequency());
        ram.setRam_type(updatedRam.getRam_type());
        ram.setAmount_of_ram(updatedRam.getAmount_of_ram());
        ram.setNumber_of_modules(updatedRam.getNumber_of_modules());
        ram.setPrice(updatedRam.getPrice());
        Ram updateRamObj = ramRepository.save(ram);
        return updateRamObj;
    }

    @Override
    public void deleteRamById(Long ramId) {
        ramRepository.deleteById(ramId);
    }

}
