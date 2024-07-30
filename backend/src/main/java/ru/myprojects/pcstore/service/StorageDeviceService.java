package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.StorageDevice;

import java.util.List;

public interface StorageDeviceService {
    StorageDevice createStorageDevice(StorageDevice storageDevice);
    StorageDevice getStorageDeviceById(Long storageDeviceId);
    List<StorageDevice> getAllStorageDevices();
    StorageDevice updateStorageDevice(Long storageDeviceId, StorageDevice updatedStorageDevice);
    void deleteStorageDeviceById(Long storageDeviceId);
}
