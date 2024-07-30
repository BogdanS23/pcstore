package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.Cooler;

public interface CoolerRepository extends JpaRepository<Cooler, Long> {
}
