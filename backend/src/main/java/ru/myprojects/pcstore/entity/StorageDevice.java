package ru.myprojects.pcstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "storage_devices")
public class StorageDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "type")
    private String type;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "price")
    private double price;

    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;
}
