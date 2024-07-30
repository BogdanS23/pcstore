package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.PowerSupply;
import ru.myprojects.pcstore.entity.Processor;
import ru.myprojects.pcstore.service.ProcessorService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/processors")
public class ProcessorController {
    private ProcessorService processorService;


    @PostMapping
    public ResponseEntity<Processor> createProcessor(@RequestBody Processor processor){
        Processor savedProcessor = processorService.createProcessor(processor);
        return new ResponseEntity<>(savedProcessor, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public  ResponseEntity<Processor> getProcessorById(@PathVariable("id") Long processorId){
        Processor processor = processorService.getProcessorById(processorId);
        return ResponseEntity.ok(processor);
    }

    @GetMapping
    public ResponseEntity<List<Processor>> getAllProcessors(){
        List<Processor> processorList= processorService.getAllProcessors();
        return ResponseEntity.ok(processorList);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateProcessor(@PathVariable("id") Long processorId, @RequestBody Processor updatedProcessor){
        if (processorService.findProcessorById(processorId) == null){
            return ResponseEntity.badRequest().body("Не найден такой процессор" + processorId);
        }
        Processor updateProcessor = processorService.updateProcessor(processorId, updatedProcessor);
        return ResponseEntity.ok(updateProcessor);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteProcessor(@PathVariable("id") Long processorId){
        processorService.deleteProcessorById(processorId);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long processorId, @RequestParam("file") MultipartFile file) {
        try {
            Processor eprocessor = processorService.getProcessorById(processorId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            eprocessor.setImage(imageData);
            processorService.updateProcessor(processorId, eprocessor);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
