package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.GraphicsCard;
import ru.myprojects.pcstore.entity.Motherboard;
import ru.myprojects.pcstore.service.MotherboardService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/motherboards")
public class MotherboardController {
    private MotherboardService motherboardService;

    @PostMapping
    public ResponseEntity<Motherboard> createMotherboard(@RequestBody Motherboard motherboard) {
        Motherboard savedMotherboard = motherboardService.createMotherboard(motherboard);
        return new ResponseEntity<>(savedMotherboard, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Motherboard> getMotherboardById(@PathVariable("id") Long motherboardId) {
        Motherboard motherboard = motherboardService.getMotherboardById(motherboardId);
        return ResponseEntity.ok(motherboard);
    }

    @GetMapping
    public ResponseEntity<List<Motherboard>> getAllMotherboards() {
        List<Motherboard> motherboardsList = motherboardService.getAllMotherboards();
        return ResponseEntity.ok(motherboardsList);
    }

    @PutMapping("{id}")
    public ResponseEntity<Motherboard> updateMotherboard(@PathVariable("id") Long motherboardId, @RequestBody Motherboard motherboard) {
        Motherboard updateMotherboard = motherboardService.updateMotherboard(motherboardId, motherboard);
        return ResponseEntity.ok(updateMotherboard);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteMotherboard(@PathVariable("id") Long motherboardId) {
        motherboardService.deleteMotherboardById(motherboardId);
        return ResponseEntity.ok("Deleted successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long motherboardId, @RequestParam("file") MultipartFile file) {
        try {
            Motherboard emotherboard = motherboardService.getMotherboardById(motherboardId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            emotherboard.setImage(imageData);
            motherboardService.updateMotherboard(motherboardId, emotherboard);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
