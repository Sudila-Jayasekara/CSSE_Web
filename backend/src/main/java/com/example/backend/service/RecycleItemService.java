package com.example.backend.service;

import com.example.backend.entity.RecycleItem;
import com.example.backend.repository.RecycleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecycleItemService {
    @Autowired
    private RecycleItemRepository recycleItemRepository;

    public List<RecycleItem> getAllRecycleItems() {
        return recycleItemRepository.findAll();  // Call on instance, not statically
    }

    public RecycleItem getRecycleItemById(Long recycleItemId) {
        return recycleItemRepository.findById(recycleItemId).orElse(null);  // Call on instance
    }

    public RecycleItem saveRecycleItem(RecycleItem recycleItem) {
        return recycleItemRepository.save(recycleItem);  // Call on instance
    }

    public void deleteRecycleItemById(Long recycleItemId) {
        recycleItemRepository.deleteById(recycleItemId);  // Call on instance
    }
}
