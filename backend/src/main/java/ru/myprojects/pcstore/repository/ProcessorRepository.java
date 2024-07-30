package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.Processor;

public interface ProcessorRepository extends JpaRepository<Processor, Long> {
}
