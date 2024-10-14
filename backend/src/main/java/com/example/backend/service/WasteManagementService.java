package com.example.backend.service;

import com.example.backend.entity.WasteManagement;
import com.example.backend.repository.WasteManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WasteManagementService {

    @Autowired
    private WasteManagementRepository wasteManagementRepository;

    public List<WasteManagement> getAllWasteManagementEntries() {
        return wasteManagementRepository.findAll();  // Call on instance, not statically
    }

    public WasteManagement getWasteManagementById(Long classId) {
        return wasteManagementRepository.findById(classId).orElse(null);  // Call on instance
    }

    public WasteManagement saveWasteManagementEntry(WasteManagement classEntity) {
        return wasteManagementRepository.save(classEntity);  // Call on instance
    }

    public void deleteWasteManagementEntry(Long classId) {
        wasteManagementRepository.deleteById(classId);  // Call on instance
    }

}
