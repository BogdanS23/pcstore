package ru.myprojects.pcstore.service;

import ru.myprojects.pcstore.entity.GraphicsCard;

import java.util.List;

public interface GraphicsCardService {
    GraphicsCard createGraphicsCard(GraphicsCard graphicsCard);
    GraphicsCard getGraphicsCardById(Long graphicsCardId);
    List<GraphicsCard> getAllGraphicsCards();
    GraphicsCard updateGraphicsCard(Long graphicsCardId, GraphicsCard updatedGraphicsCard);
    void deleteGraphicsCardById(Long graphicsCardId);
}
