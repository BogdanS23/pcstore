package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.GraphicsCard;


public interface GraphicsCardRepository extends JpaRepository<GraphicsCard, Long> {
}
