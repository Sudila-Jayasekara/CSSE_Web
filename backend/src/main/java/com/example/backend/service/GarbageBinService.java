package com.example.backend.service;

import com.example.backend.entity.GarbageBin;
import com.example.backend.repository.GarbageBinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarbageBinService {
    @Autowired
    private GarbageBinRepository garbageBinRepository;

    public List<GarbageBin> getAllGarbageBin() {
        return garbageBinRepository.findAll();  // Call on instance, not statically
    }

    public GarbageBin getGarbageBinById(Long garbageBinId) {
        return garbageBinRepository.findById(garbageBinId).orElse(null);  // Call on instance
    }

    public GarbageBin saveGarbageBin(GarbageBin garbageBin) {
        return garbageBinRepository.save(garbageBin);  // Call on instance
    }

    public void deleteGarbageBin(Long garbageBinId) {
        garbageBinRepository.deleteById(garbageBinId);  // Call on instance
    }
}
