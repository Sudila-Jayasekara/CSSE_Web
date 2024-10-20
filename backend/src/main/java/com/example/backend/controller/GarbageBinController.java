package com.example.backend.controller;

import com.example.backend.entity.GarbageBin;
import com.example.backend.service.GarbageBinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garbage-bin")
public class GarbageBinController {

    @Autowired
    private GarbageBinService garbageBinService;

    @GetMapping
    public List<GarbageBin> getAllGarbageBin() {
        return garbageBinService.getAllGarbageBin();
    }

    @GetMapping("/{id}")
    public GarbageBin getGarbageBinById(@PathVariable Long id) {
        return garbageBinService.getGarbageBinById(id);
    }

    @PostMapping
    public GarbageBin saveGarbageBin(@RequestBody GarbageBin garbageBin) {
        return garbageBinService.saveGarbageBin(garbageBin);
    }

    @DeleteMapping("/{id}")
    public void deleteGarbageBin(@PathVariable Long id) {
        garbageBinService.deleteGarbageBin(id);
    }

    @PutMapping("/{id}")
    public GarbageBin updateGarbageBin(@PathVariable Long id, @RequestBody GarbageBin garbageBinDetails) {
        return garbageBinService.updateGarbageBin(id, garbageBinDetails);
    }
}
