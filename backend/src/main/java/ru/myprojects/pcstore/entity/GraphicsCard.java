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
@Table(name = "gpus")
public class GraphicsCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "vendor")
    private String vendor;

    @Column(name = "gpu_frequency")
    private String gpu_frequency;

    @Column(name = "memory_type")
    private String memory_type;

    @Column(name = "amount_of_memory")
    private String amount_of_memory;

    @Column(name = "tdp")
    private String tdp;

    @Column(name = "pcie_version")
    private String pcie_version;

    @Column(name = "price")
    private double price;

    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;
}
