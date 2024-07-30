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
@Table(name = "cpus")
public class Processor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "socket")
    private String socket;

    @Column(name = "number_of_cores")
    private Integer number_of_cores;

    @Column(name = "number_of_threads")
    private Integer number_of_threads;

    @Column(name = "frequency")
    private String frequency;

    @Column(name = "ram_type")
    private String ram_type;

    @Column(name = "tdp")
    private Integer tdp;

    @Column(name = "price")
    private double price;

    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;
}
