package ru.myprojects.pcstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myprojects.pcstore.entity.StorageDevice;

public interface StorageDeviceRepository extends JpaRepository<StorageDevice, Long> {
}
