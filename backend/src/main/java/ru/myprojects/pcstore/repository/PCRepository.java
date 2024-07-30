package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.PC;

public interface PCRepository extends JpaRepository<PC, Long> {
}
