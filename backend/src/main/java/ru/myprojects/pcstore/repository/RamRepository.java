package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.Ram;

public interface RamRepository extends JpaRepository<Ram, Long> {
}
