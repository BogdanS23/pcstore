package ru.myprojects.pcstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.myprojects.pcstore.entity.GraphicsCard;
import ru.myprojects.pcstore.repository.GraphicsCardRepository;
import ru.myprojects.pcstore.service.GraphicsCardService;

import java.util.List;

@Service
@AllArgsConstructor
public class GraphicsCardServiceImpl implements GraphicsCardService {

    private GraphicsCardRepository graphicsCardRepository;

    @Override
    public GraphicsCard createGraphicsCard(GraphicsCard graphicsCard) {
        return graphicsCardRepository.save(graphicsCard);
    }

    @Override
    public GraphicsCard getGraphicsCardById(Long graphicsCardId) {
        return graphicsCardRepository.findById(graphicsCardId).orElseThrow(() -> new RuntimeException("Не найдет такой видеокарта"));
    }

    @Override
    public List<GraphicsCard> getAllGraphicsCards() {
        return graphicsCardRepository.findAll();
    }

    @Override
    public GraphicsCard updateGraphicsCard(Long graphicsCardId, GraphicsCard updatedGraphicsCard) {
        GraphicsCard graphicsCard = graphicsCardRepository.findById(graphicsCardId).orElseThrow(() -> new RuntimeException("Не найдет такой видеокарта"));
        graphicsCard.setManufacturer(updatedGraphicsCard.getManufacturer());
        graphicsCard.setModel(updatedGraphicsCard.getModel());
        graphicsCard.setGpu_frequency(updatedGraphicsCard.getGpu_frequency());
        graphicsCard.setMemory_type(updatedGraphicsCard.getMemory_type());
        graphicsCard.setAmount_of_memory(updatedGraphicsCard.getAmount_of_memory());
        graphicsCard.setTdp(updatedGraphicsCard.getTdp());
        graphicsCard.setPcie_version(updatedGraphicsCard.getPcie_version());
        graphicsCard.setPrice(updatedGraphicsCard.getPrice());
        GraphicsCard updateGraphicsCardObj = graphicsCardRepository.save(graphicsCard);
        return updateGraphicsCardObj;
    }

    @Override
    public void deleteGraphicsCardById(Long graphicsCardId) {
        graphicsCardRepository.deleteById(graphicsCardId);
    }
}
