package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.PowerSupply;
import ru.myprojects.pcstore.entity.Ram;
import ru.myprojects.pcstore.service.RamService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/rams")
public class RamController {
    private RamService ramService;

    @PostMapping
    public ResponseEntity<Ram> createRam(@RequestBody Ram ram) {
        Ram savedRam = ramService.createRam(ram);
        return new ResponseEntity<>(savedRam, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Ram> getRamById(@PathVariable("id") Long ramId) {
        Ram ram = ramService.getRamById(ramId);
        return ResponseEntity.ok(ram);
    }

    @GetMapping
    public ResponseEntity<List<Ram>> getAllRams() {
        List<Ram> ramsList = ramService.getAllRam();
        return ResponseEntity.ok(ramsList);
    }

    @PutMapping("{id}")
    public ResponseEntity<Ram> updateRam(@PathVariable("id") Long ramId, @RequestBody Ram ram) {
        Ram updateRam = ramService.updateRam(ramId, ram);
        return ResponseEntity.ok(updateRam);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteRam(@PathVariable("id") Long ramId) {
        ramService.deleteRamById(ramId);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long ramId, @RequestParam("file") MultipartFile file) {
        try {
            Ram eram = ramService.getRamById(ramId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            eram.setImage(imageData);
            ramService.updateRam(ramId, eram);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
