package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.Ram;
import ru.myprojects.pcstore.entity.StorageDevice;
import ru.myprojects.pcstore.service.StorageDeviceService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/storage-devices")
public class StorageDeviceController {
    private StorageDeviceService storageDeviceService;

    @PostMapping
    public ResponseEntity<StorageDevice> createStorageDevice(@RequestBody StorageDevice storageDevice) {
        StorageDevice savedStorageDevice = storageDeviceService.createStorageDevice(storageDevice);
        return new ResponseEntity<>(savedStorageDevice, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<StorageDevice> getStorageDeviceById(@PathVariable("id") Long storageDeviceId) {
        StorageDevice storageDevice = storageDeviceService.getStorageDeviceById(storageDeviceId);
        return ResponseEntity.ok(storageDevice);
    }

    @GetMapping
    public ResponseEntity<List<StorageDevice>> getAllStorageDevices() {
        List<StorageDevice> storageDevicesList = storageDeviceService.getAllStorageDevices();
        return ResponseEntity.ok(storageDevicesList);
    }

    @PutMapping("{id}")
    public ResponseEntity<StorageDevice> updateStorageDevice(@PathVariable("id") Long storageDeviceId, @RequestBody StorageDevice storageDevice) {
        StorageDevice updateStorageDevice = storageDeviceService.updateStorageDevice(storageDeviceId, storageDevice);
        return ResponseEntity.ok(updateStorageDevice);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteStorageDevice(@PathVariable("id") Long storageDeviceId) {
        storageDeviceService.deleteStorageDeviceById(storageDeviceId);
        return ResponseEntity.ok("Deleted successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long storageDeviceId, @RequestParam("file") MultipartFile file) {
        try {
            StorageDevice estorageDevice = storageDeviceService.getStorageDeviceById(storageDeviceId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            estorageDevice.setImage(imageData);
            storageDeviceService.updateStorageDevice(storageDeviceId, estorageDevice);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
