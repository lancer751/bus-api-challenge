package com.turismociva.turismoApi.services;

import com.turismociva.turismoApi.entitys.Marca;
import com.turismociva.turismoApi.repositories.MarcaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MarcaService {
    private final MarcaRepository marcaRepository;

    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    public Page<Marca> obtenerTodos(Pageable pageable) {
        return marcaRepository.findAll(pageable);
    }

    public Optional<Marca> obtenerPorId(Long id) {
        return marcaRepository.findById(id);
    }
}
