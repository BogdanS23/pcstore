package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.StorageDevice;
import ru.myprojects.pcstore.repository.StorageDeviceRepository;
import ru.myprojects.pcstore.service.StorageDeviceService;

import java.util.List;

@Service
@AllArgsConstructor
public class StorageDeviceServiceImpl implements StorageDeviceService {
    private StorageDeviceRepository storageDeviceRepository;

    @Override
    public StorageDevice createStorageDevice(StorageDevice storageDevice) {
        return storageDeviceRepository.save(storageDevice);
    }

    @Override
    public StorageDevice getStorageDeviceById(Long storageDeviceId) {
        return storageDeviceRepository.findById(storageDeviceId).orElseThrow(() -> new RuntimeException("Не найдет такое устройство хранения"));
    }

    @Override
    public List<StorageDevice> getAllStorageDevices() {
        return storageDeviceRepository.findAll();
    }

    @Override
    public StorageDevice updateStorageDevice(Long storageDeviceId, StorageDevice updatedStorageDevice) {
        StorageDevice storageDevice = storageDeviceRepository.findById(storageDeviceId).orElseThrow(() -> new RuntimeException("Не найдет такое устройство хранения"));
        storageDevice.setManufacturer(updatedStorageDevice.getManufacturer());
        storageDevice.setModel(updatedStorageDevice.getModel());
        storageDevice.setType(updatedStorageDevice.getType());
        storageDevice.setCapacity(updatedStorageDevice.getCapacity());
        storageDevice.setPrice(updatedStorageDevice.getPrice());
        StorageDevice updateStorageDeviceObj = storageDeviceRepository.save(storageDevice);
        return updateStorageDeviceObj;
    }

    @Override
    public void deleteStorageDeviceById(Long storageDeviceId) {
        storageDeviceRepository.deleteById(storageDeviceId);
    }
}
