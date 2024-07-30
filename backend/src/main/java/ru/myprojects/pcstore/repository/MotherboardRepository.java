package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.Motherboard;

public interface MotherboardRepository extends JpaRepository<Motherboard, Long> {
}
