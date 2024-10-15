package com.example.backend.controller;

import com.example.backend.entity.SpecialWaste;
import com.example.backend.service.SpecialWasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/special-waste")
public class SpecialWasteController {

    @Autowired
    private SpecialWasteService specialWasteService;

    @GetMapping
    public List<SpecialWaste> getAllSpecialWaste() {
        return specialWasteService.getAllSpecialWaste();
    }

    @GetMapping("/{id}")
    public SpecialWaste getSpecialWasteById(@PathVariable Long id) {
        return specialWasteService.getSpecialWasteById(id);
    }

    @PostMapping
    public SpecialWaste saveSpecialWaste(@RequestBody SpecialWaste specialWaste) {
        return specialWasteService.saveSpecialWaste(specialWaste);
    }

    @DeleteMapping("/{id}")
    public void deleteSpecialWasteById(@PathVariable Long id) {
        specialWasteService.deleteSpecialWasteById(id);
    }
}
