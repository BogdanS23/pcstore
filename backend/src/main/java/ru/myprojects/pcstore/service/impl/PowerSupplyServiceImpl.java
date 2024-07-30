package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.PowerSupply;
import ru.myprojects.pcstore.repository.PowerSupplyRepository;
import ru.myprojects.pcstore.service.PowerSupplyService;

import java.util.List;

@Service
@AllArgsConstructor
public class PowerSupplyServiceImpl implements PowerSupplyService {
    private PowerSupplyRepository powerSupplyRepository;

    @Override
    public PowerSupply createPowerSupply(PowerSupply powerSupply) {
        return powerSupplyRepository.save(powerSupply);
    }

    @Override
    public PowerSupply getPowerSupplyById(Long powerSupplyId) {
        return powerSupplyRepository.findById(powerSupplyId).orElseThrow(() -> new RuntimeException("Не найдет такой блок питания"));
    }

    @Override
    public List<PowerSupply> getAllPowerSupplies() {
        return powerSupplyRepository.findAll();
    }

    @Override
    public PowerSupply updatePowerSupply(Long powerSupplyId, PowerSupply updatedPowerSupply) {
        PowerSupply powerSupply = powerSupplyRepository.findById(powerSupplyId).orElseThrow(() -> new RuntimeException("Не найдет такой блок питания"));
        powerSupply.setManufacturer(updatedPowerSupply.getManufacturer());
        powerSupply.setModel(updatedPowerSupply.getModel());
        powerSupply.setPower(updatedPowerSupply.getPower());
        powerSupply.setPrice(updatedPowerSupply.getPrice());
        PowerSupply updatePowerSupplyObj = powerSupplyRepository.save(powerSupply);
        return updatePowerSupplyObj;
    }

    @Override
    public void deletePowerSupplyById(Long powerSupplyId) {
        powerSupplyRepository.deleteById(powerSupplyId);
    }
}
