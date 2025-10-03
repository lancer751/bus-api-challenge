package com.turismociva.turismoApi.controllers;

import com.turismociva.turismoApi.services.MarcaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/marca")
public class MarcaController {
    private final MarcaService marcaService;
    public MarcaController(MarcaService marcaService) {
        this.marcaService = marcaService;
    }
    //{/ Construyendo REST API para marcas
}