package com.turismociva.turismoApi.repositories;

import com.turismociva.turismoApi.entitys.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
}
