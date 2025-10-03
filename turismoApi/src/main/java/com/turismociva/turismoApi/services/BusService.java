package com.turismociva.turismoApi.services;

import com.turismociva.turismoApi.entitys.Bus;
import com.turismociva.turismoApi.repositories.BusRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BusService {
    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public Page<Bus> obtenerTodos(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    public Optional<Bus> obtenerPorId(Long id) {
        return busRepository.findById(id);
    }
}