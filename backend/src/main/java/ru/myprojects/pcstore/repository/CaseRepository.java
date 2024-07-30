package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.Case;

public interface CaseRepository extends JpaRepository<Case, Long> {
}
