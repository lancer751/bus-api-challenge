package com.turismociva.turismoApi.entitys;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="buses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false, unique=true)
    private String numeroBus;

    @Column(nullable =false, unique=true)
    private String placa;

    @Column(nullable = true, updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    private String caracteristicas;

    @ManyToOne
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;

    private Boolean activo = true;
}