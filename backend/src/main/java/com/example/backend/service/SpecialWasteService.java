package com.example.backend.service;

import com.example.backend.entity.SpecialWaste;
import com.example.backend.repository.SpecialWasteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialWasteService {

    @Autowired
    private SpecialWasteRepository specialWasteRepository;

    public List<SpecialWaste> getAllSpecialWaste() {
        return specialWasteRepository.findAll();  // Call on instance, not statically
    }

    public SpecialWaste getSpecialWasteById(Long specialWasteId) {
        return specialWasteRepository.findById(specialWasteId).orElse(null);  // Call on instance
    }

    public SpecialWaste saveSpecialWaste(SpecialWaste classEntity) {
        return specialWasteRepository.save(classEntity);  // Call on instance
    }

    public void deleteSpecialWasteById(Long specialWasteId) {
        specialWasteRepository.deleteById(specialWasteId);  // Call on instance
    }

}
