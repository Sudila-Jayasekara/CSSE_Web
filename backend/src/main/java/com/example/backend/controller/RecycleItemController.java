package com.example.backend.controller;

import com.example.backend.entity.RecycleItem;
import com.example.backend.service.RecycleItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recycle-item")
public class RecycleItemController {

    @Autowired
    private RecycleItemService recycleItemService;

    @GetMapping
    public List<RecycleItem> getAllRecycleItems() {
        return recycleItemService.getAllRecycleItems();
    }

    @GetMapping("/{id}")
    public RecycleItem getRecycleItemById(@PathVariable Long id) {
        return recycleItemService.getRecycleItemById(id);
    }

    @PostMapping
    public RecycleItem saveRecycleItem(@RequestBody RecycleItem recycleItem) {
        return recycleItemService.saveRecycleItem(recycleItem);
    }

    @DeleteMapping("/{id}")
    public void deleteRecycleItemById(@PathVariable Long id) {
        recycleItemService.deleteRecycleItemById(id);
    }
}
