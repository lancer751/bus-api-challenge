package com.turismociva.turismoApi.controllers;

import com.turismociva.turismoApi.entitys.Bus;
import com.turismociva.turismoApi.services.BusService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/bus")
public class BusController {
    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    // GET /bus?page=0&size=10
    @GetMapping
    public Page<Bus> listarBuses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return busService.obtenerTodos(PageRequest.of(page, size));
    }

    // GET /bus/{id}
    @GetMapping("/{id}")
    public Bus obtenerBus(@PathVariable Long id) {
        return busService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Bus no encontrado"));
    }
}
