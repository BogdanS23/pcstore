package ru.myprojects.pcstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.myprojects.pcstore.entity.PC;
import ru.myprojects.pcstore.service.PCService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pcs")
public class PCController {

    @Autowired
    private PCService pcService;

    @GetMapping
    public List<PC> getAllPCs() {
        return pcService.getAllPCs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PC> getPCById(@PathVariable Long id) {
        PC pc = pcService.getPCById(id);
        return ResponseEntity.ok(pc);
    }

    @PostMapping
    public PC createPC(@RequestBody PC pc) {
        return pcService.createPC(pc);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PC> updatePC(@PathVariable Long id, @RequestBody PC pcDetails) {
        PC updatedPC = pcService.updatePC(id, pcDetails);
        return ResponseEntity.ok(updatedPC);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePC(@PathVariable Long id) {
        pcService.deletePC(id);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<PC> ratePC(@PathVariable Long id, @RequestBody Map<String, Integer> payload) {
        int ratingChange = payload.get("ratingChange");
        PC updatedPC = pcService.updateRating(id, ratingChange);
        return ResponseEntity.ok(updatedPC);
    }
}
