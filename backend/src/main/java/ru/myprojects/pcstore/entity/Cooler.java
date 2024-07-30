package ru.myprojects.pcstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "coolers")
public class Cooler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "tdp")
    private Integer tdp;

    @Column(name = "price")
    private double price;

    @ElementCollection
    @CollectionTable(name = "cooler_sockets", joinColumns = @JoinColumn(name = "cooler_id"))
    @Column(name = "socket")
    private List<String> compatibleSockets;

    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;
}
