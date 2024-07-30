package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.PowerSupply;

import java.util.List;

public interface PowerSupplyService {
    PowerSupply createPowerSupply(PowerSupply powerSupply);
    PowerSupply getPowerSupplyById(Long powerSupplyId);
    List<PowerSupply> getAllPowerSupplies();
    PowerSupply updatePowerSupply(Long powerSupplyId, PowerSupply updatedPowerSupply);
    void deletePowerSupplyById(Long powerSupplyId);
}
