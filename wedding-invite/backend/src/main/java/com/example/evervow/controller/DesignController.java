package com.example.evervow.controller;

import com.example.evervow.entity.Design;
import com.example.evervow.repository.DesignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = {"http://localhost:3000", "https://evervow.vercel.app"})
public class DesignController {

    @Autowired
    private DesignRepository designRepository;

    @GetMapping
    public ResponseEntity<List<Design>> getAllActiveDesigns() {
        List<Design> designs = designRepository.findByIsActiveTrue();
        return ResponseEntity.ok(designs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Design> getDesign(@PathVariable Long id) {
        return designRepository.findById(id)
            .map(design -> ResponseEntity.ok(design))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Design> getDesignByName(@PathVariable String name) {
        Design design = designRepository.findByName(name);
        if (design != null) return ResponseEntity.ok(design);
        return ResponseEntity.notFound().build();
    }
}

