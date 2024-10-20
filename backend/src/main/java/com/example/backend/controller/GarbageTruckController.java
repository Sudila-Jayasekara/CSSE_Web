package com.example.backend.controller;

import com.example.backend.entity.GarbageBin;
import com.example.backend.entity.GarbageTruck;
import com.example.backend.entity.RecycleItem;
import com.example.backend.service.GarbageTruckService;
import com.example.backend.service.RecycleItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garbage-truck")
public class GarbageTruckController {

    @Autowired
    private GarbageTruckService garbageTruckService;

    @PostMapping("/assign")
    public ResponseEntity<GarbageTruck> assignDriver(@RequestParam String driverName) {
        GarbageTruck truck = garbageTruckService.assignDriver(driverName);
        return ResponseEntity.ok(truck);
    }

    @PostMapping("/notify")
    public ResponseEntity<Void> notifyGarbageTruck(@RequestBody GarbageBin bin) {
        // Assume the garbage truck is already assigned to the bin
        garbageTruckService.notifyGarbageTruck(bin.getGarbageTruck(), bin);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notifications")
    public List<GarbageTruck> getAllNotifications() {
        return garbageTruckService.getAllNotifications();
    }

    @GetMapping("/check-full-bins")
    public ResponseEntity<List<GarbageBin>> checkFullBins() {
        List<GarbageBin> fullBins = garbageTruckService.checkForFullBins();
        return ResponseEntity.ok(fullBins);
    }
}