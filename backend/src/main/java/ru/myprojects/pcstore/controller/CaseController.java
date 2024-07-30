package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.Case;
import ru.myprojects.pcstore.service.CaseService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private CaseService caseService;

    @PostMapping
    public ResponseEntity<Case> createCase(@RequestBody Case ecase){
        Case savedCase = caseService.createCase(ecase);
        return new ResponseEntity<>(savedCase, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public  ResponseEntity<Case> getCaseById(@PathVariable("id") Long caseId){
        Case ecase = caseService.getCaseById(caseId);
        return ResponseEntity.ok(ecase);
    }

    @GetMapping
    public ResponseEntity<List<Case>> getAllCases(){
        List<Case> caseList= caseService.getAllCase();
        return ResponseEntity.ok(caseList);
    }

    @PutMapping("{id}")
    public ResponseEntity<Case> updateCase(@PathVariable("id") Long caseId, @RequestBody Case ecase){
        Case updateCase = caseService.updateCase(caseId, ecase);
        return ResponseEntity.ok(updateCase);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCase(@PathVariable("id") Long caseId){
        caseService.deleteCaseById(caseId);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long caseId, @RequestParam("file") MultipartFile file) {
        try {
            Case ecase = caseService.getCaseById(caseId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            ecase.setImage(imageData);
            caseService.updateCase(caseId, ecase);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
