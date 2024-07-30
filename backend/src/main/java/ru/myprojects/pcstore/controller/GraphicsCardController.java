package ru.myprojects.pcstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.myprojects.pcstore.entity.Cooler;
import ru.myprojects.pcstore.entity.GraphicsCard;
import ru.myprojects.pcstore.service.GraphicsCardService;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/graphics-cards")
public class GraphicsCardController {

    private GraphicsCardService graphicsCardService;


    @PostMapping
    public ResponseEntity<GraphicsCard> createGraphicsCard(@RequestBody GraphicsCard graphicsCard) {
        GraphicsCard savedGraphicsCard = graphicsCardService.createGraphicsCard(graphicsCard);
        return new ResponseEntity<>(savedGraphicsCard, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GraphicsCard> getGraphicsCardById(@PathVariable("id") Long graphicsCardId) {
        GraphicsCard graphicsCard = graphicsCardService.getGraphicsCardById(graphicsCardId);
        return ResponseEntity.ok(graphicsCard);
    }

    @GetMapping
    public ResponseEntity<List<GraphicsCard>> getAllGraphicsCards() {
        List<GraphicsCard> graphicsCardList = graphicsCardService.getAllGraphicsCards();
        return ResponseEntity.ok(graphicsCardList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GraphicsCard> updateGraphicsCard(@PathVariable("id") Long graphicsCardId, @RequestBody GraphicsCard graphicsCard) {
        GraphicsCard updateGraphicsCard = graphicsCardService.updateGraphicsCard(graphicsCardId, graphicsCard);
        return ResponseEntity.ok(updateGraphicsCard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGraphicsCard(@PathVariable("id") Long graphicsCardId) {
        graphicsCardService.deleteGraphicsCardById(graphicsCardId);
        return ResponseEntity.ok("Delete successfully!");
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long graphicsCardId, @RequestParam("file") MultipartFile file) {
        try {
            GraphicsCard egraphicsCard = graphicsCardService.getGraphicsCardById(graphicsCardId);

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Выберите файл для загрузки");
            }

            byte[] imageData = file.getBytes();

            egraphicsCard.setImage(imageData);
            graphicsCardService.updateGraphicsCard(graphicsCardId, egraphicsCard);

            return ResponseEntity.ok("Изображение успешно загружено");
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки изображения: " + ex.getMessage());
        }
    }
}
