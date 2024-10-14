package com.example.backend.controller;

import com.example.backend.entity.WasteManagement;
import com.example.backend.service.WasteManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waste-management")
public class WasteManagementController {

    @Autowired
    private WasteManagementService wasteManagementService;

    @GetMapping
    public List<WasteManagement> getAllWasteManagementEntries() {
        return wasteManagementService.getAllWasteManagementEntries();
    }

    @GetMapping("/{id}")
    public WasteManagement getWasteManagementById(@PathVariable Long id) {
        return wasteManagementService.getWasteManagementById(id);
    }

    @PostMapping
    public WasteManagement createWasteManagementEntry(@RequestBody WasteManagement wasteManagement) {
        return wasteManagementService.saveWasteManagementEntry(wasteManagement);
    }

    @DeleteMapping("/{id}")
    public void deleteWasteManagementEntry(@PathVariable Long id) {
        wasteManagementService.deleteWasteManagementEntry(id);
    }
}
