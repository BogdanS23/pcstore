package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.Case;
import ru.myprojects.pcstore.entity.Cooler;
import ru.myprojects.pcstore.service.CoolerService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/coolers")
public class CoolerController {
    private CoolerService coolerService;

    @PostMapping
    public ResponseEntity<Cooler> createCooler(@RequestBody Cooler cooler){
        Cooler savedCooler = coolerService.createCooler(cooler);
        return new ResponseEntity<>(savedCooler, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public  ResponseEntity<Cooler> getCoolerById(@PathVariable("id") Long coolerId){
        Cooler cooler = coolerService.getCoolerById(coolerId);
        return ResponseEntity.ok(cooler);
    }

    @GetMapping
    public ResponseEntity<List<Cooler>> getAllCooler(){
        List<Cooler> coolerList= coolerService.getAllCooler();
        return ResponseEntity.ok(coolerList);
    }

    @PutMapping("{id}")
    public ResponseEntity<Cooler> updateCooler(@PathVariable("id") Long coolerId, @RequestBody Cooler cooler){
        Cooler updateCooler = coolerService.updateCooler(coolerId, cooler);
        return ResponseEntity.ok(updateCooler);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCooler(@PathVariable("id") Long coolerId){
        coolerService.deleteCoolerById(coolerId);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long coolerId, @RequestParam("file") MultipartFile file) {
        try {
            Cooler ecooler = coolerService.getCoolerById(coolerId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            ecooler.setImage(imageData);
            coolerService.updateCooler(coolerId, ecooler);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
