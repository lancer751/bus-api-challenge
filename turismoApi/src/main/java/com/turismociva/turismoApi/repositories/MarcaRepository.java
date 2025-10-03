package com.turismociva.turismoApi.repositories;

import com.turismociva.turismoApi.entitys.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
}
