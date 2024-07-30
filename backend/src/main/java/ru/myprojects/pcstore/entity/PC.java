package ru.myprojects.pcstore.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import ru.myprojects.pcstore.entity.enums.OrderStatus;
import ru.myprojects.pcstore.entity.enums.PCType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pcs")
public class PC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pccase", referencedColumnName = "id")
    private Case pccase;

    @ManyToOne
    @JoinColumn(name = "cooler", referencedColumnName = "id")
    private Cooler cooler;

    @ManyToOne
    @JoinColumn(name = "graphics_card", referencedColumnName = "id")
    private GraphicsCard graphicsCard;

    @ManyToOne
    @JoinColumn(name = "motherboard", referencedColumnName = "id")
    private Motherboard motherboard;

    @ManyToOne
    @JoinColumn(name = "power_supply", referencedColumnName = "id")
    private PowerSupply powerSupply;

    @ManyToOne
    @JoinColumn(name = "processor", referencedColumnName = "id")
    private Processor processor;

    @ManyToOne
    @JoinColumn(name = "ram", referencedColumnName = "id")
    private Ram ram;

    @ManyToOne
    @JoinColumn(name = "storage_device", referencedColumnName = "id")
    private StorageDevice storageDevice;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PCType pcType;

    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)")
    private byte[] image;

    @Column(name = "rating")
    private Integer rating;
}
