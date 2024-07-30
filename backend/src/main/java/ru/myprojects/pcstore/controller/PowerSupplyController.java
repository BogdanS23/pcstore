package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.PowerSupply;
import ru.myprojects.pcstore.service.PowerSupplyService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/power-supplies")
public class PowerSupplyController {
    private PowerSupplyService powerSupplyService;

    @PostMapping
    public ResponseEntity<PowerSupply> createPowerSupply(@RequestBody PowerSupply powerSupply) {
        PowerSupply savedPowerSupply = powerSupplyService.createPowerSupply(powerSupply);
        return new ResponseEntity<>(savedPowerSupply, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PowerSupply> getPowerSupplyById(@PathVariable("id") Long powerSupplyId) {
        PowerSupply powerSupply = powerSupplyService.getPowerSupplyById(powerSupplyId);
        return ResponseEntity.ok(powerSupply);
    }

    @GetMapping
    public ResponseEntity<List<PowerSupply>> getAllPowerSupplies() {
        List<PowerSupply> powerSuppliesList = powerSupplyService.getAllPowerSupplies();
        return ResponseEntity.ok(powerSuppliesList);
    }

    @PutMapping("{id}")
    public ResponseEntity<PowerSupply> updatePowerSupply(@PathVariable("id") Long powerSupplyId, @RequestBody PowerSupply powerSupply) {
        PowerSupply updatePowerSupply = powerSupplyService.updatePowerSupply(powerSupplyId, powerSupply);
        return ResponseEntity.ok(updatePowerSupply);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deletePowerSupply(@PathVariable("id") Long powerSupplyId) {
        powerSupplyService.deletePowerSupplyById(powerSupplyId);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long powerSupplyId, @RequestParam("file") MultipartFile file) {
        try {
            PowerSupply epowerSupply = powerSupplyService.getPowerSupplyById(powerSupplyId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            epowerSupply.setImage(imageData);
            powerSupplyService.updatePowerSupply(powerSupplyId, epowerSupply);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
