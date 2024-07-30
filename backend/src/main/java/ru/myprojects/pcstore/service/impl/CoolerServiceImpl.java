package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.Cooler;
import ru.myprojects.pcstore.repository.CoolerRepository;
import ru.myprojects.pcstore.service.CoolerService;

import java.util.List;
@Service
@AllArgsConstructor
public class CoolerServiceImpl implements CoolerService {

    @Autowired
    private CoolerRepository coolerRepository;

    @Override
    public Cooler createCooler(Cooler cooler) {
        return coolerRepository.save(cooler);
    }

    @Override
    public Cooler getCoolerById(Long coolerId) {
        return coolerRepository.findById(coolerId).orElseThrow(() -> new RuntimeException("Не найдет такой кулер"));
    }

    @Override
    public List<Cooler> getAllCooler() {
        return coolerRepository.findAll();
    }

    @Override
    public Cooler updateCooler(Long coolerId, Cooler updateCooler) {
        Cooler cooler = coolerRepository.findById(coolerId).orElseThrow(() -> new RuntimeException("Не найдет такой кулер"));
        cooler.setModel(updateCooler.getModel());
        cooler.setManufacturer(updateCooler.getManufacturer());
        cooler.setTdp(updateCooler.getTdp());
        cooler.setPrice(updateCooler.getPrice());
        cooler.setCompatibleSockets(updateCooler.getCompatibleSockets());
        Cooler updateCoolerObj = coolerRepository.save(cooler);
        return updateCoolerObj;
    }

    @Override
    public void deleteCoolerById(Long coolerId) {
        coolerRepository.deleteById(coolerId);
    }
}
