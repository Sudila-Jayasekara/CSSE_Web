package com.example.backend.controller;

import com.example.backend.entity.SpecialWaste;
import com.example.backend.service.SpecialWasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waste-management")
public class SpecialWasteController {

    @Autowired
    private SpecialWasteService specialWasteService;

    @GetMapping
    public List<SpecialWaste> getAllWasteManagementEntries() {
        return specialWasteService.getAllWasteManagementEntries();
    }

    @GetMapping("/{id}")
    public SpecialWaste getWasteManagementById(@PathVariable Long id) {
        return specialWasteService.getWasteManagementById(id);
    }

    @PostMapping
    public SpecialWaste createWasteManagementEntry(@RequestBody SpecialWaste specialWaste) {
        return specialWasteService.saveWasteManagementEntry(specialWaste);
    }

    @DeleteMapping("/{id}")
    public void deleteWasteManagementEntry(@PathVariable Long id) {
        specialWasteService.deleteWasteManagementEntry(id);
    }
}
