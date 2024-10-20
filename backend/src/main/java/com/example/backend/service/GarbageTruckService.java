package com.example.backend.service;

import com.example.backend.entity.GarbageBin;
import com.example.backend.entity.GarbageTruck;
import com.example.backend.entity.RecycleItem;
import com.example.backend.repository.GarbageBinRepository;
import com.example.backend.repository.GarbageTruckRepository;
import com.example.backend.repository.RecycleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GarbageTruckService {

    @Autowired
    private GarbageTruckRepository garbageTruckRepository;

    @Autowired
    private GarbageBinRepository garbageBinRepository; // Inject the GarbageBinRepository

    public List<GarbageTruck> getAllNotifications() {
        return garbageTruckRepository.findAll();
    }


    public void notifyGarbageTruck(GarbageTruck truck, GarbageBin bin) {
        bin.setGarbageTruck(truck); // Set the garbage truck to the bin
        truck.setNotificationTime(LocalDateTime.now()); // Update notification time
        garbageTruckRepository.save(truck); // Save the truck to the DB
    }

    // Method to check for full garbage bins
    public List<GarbageBin> checkForFullBins() {
        List<GarbageBin> fullBins = garbageBinRepository.findAll().stream()
                .filter(GarbageBin::isFull) // Filter bins that are full
                .toList(); // Collect the results into a list

        for (GarbageBin bin : fullBins) {
            // Here you can trigger the notification logic
            GarbageTruck assignedTruck = bin.getGarbageTruck();
            if (assignedTruck != null) {
                notifyGarbageTruck(assignedTruck, bin);
            }
        }

        return fullBins; // Return the list of full bins
    }

    public GarbageTruck createGarbageTruck(GarbageTruck truck) {
        truck.setNotificationTime(LocalDateTime.now());
        truck.setCollected(false);
        return garbageTruckRepository.save(truck);
    }

    public GarbageTruck updateGarbageTruck(Long id, GarbageTruck truck) {
        Optional<GarbageTruck> existingTruckOptional = garbageTruckRepository.findById(id);
        if (existingTruckOptional.isPresent()) {
            GarbageTruck existingTruck = existingTruckOptional.get();
            existingTruck.setNotificationTime(LocalDateTime.now());
            existingTruck.setCollected(truck.isCollected());
            return garbageTruckRepository.save(existingTruck);
        } else {
            throw new RuntimeException("Garbage Truck not found with id " + id);
        }
    }

    public GarbageTruck getGarbageTruckById(Long id) {
        return garbageTruckRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Garbage Truck not found with id " + id));
    }

}