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
@Table(name = "motherboards")
public class Motherboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "socket")
    private String socket;

    @Column(name = "chipset")
    private String chipset;

    @Column(name = "ram_type")
    private String ram_type;

    @Column(name = "amount_of_ram")
    private Integer amount_of_ram;

    @Column(name = "price")
    private double price;

    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;
}
