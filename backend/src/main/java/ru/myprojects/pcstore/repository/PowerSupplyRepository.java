package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.PowerSupply;

public interface PowerSupplyRepository extends JpaRepository<PowerSupply, Long> {
}
