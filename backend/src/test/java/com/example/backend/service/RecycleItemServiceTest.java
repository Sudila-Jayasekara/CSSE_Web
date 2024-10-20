package com.example.backend.service;

import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.User;
import com.example.backend.repository.RecycleItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RecycleItemServiceTest {

    @Mock
    private RecycleItemRepository recycleItemRepository;

    @InjectMocks
    private RecycleItemService recycleItemService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllRecycleItems() {
        List<RecycleItem> recycleItems = Collections.singletonList(new RecycleItem());
        when(recycleItemRepository.findAll()).thenReturn(recycleItems);

        List<RecycleItem> result = recycleItemService.getAllRecycleItems();

        assertEquals(1, result.size());
        verify(recycleItemRepository).findAll();
    }

    @Test
    void testGetRecycleItemById() {
        Long recycleItemId = 1L;
        RecycleItem recycleItem = new RecycleItem(recycleItemId, "Plastic", 10.0, LocalDateTime.now(), "123 Street", new User(), null);
        when(recycleItemRepository.findById(recycleItemId)).thenReturn(Optional.of(recycleItem));

        RecycleItem result = recycleItemService.getRecycleItemById(10L);

        assertNotNull(result);
        assertEquals(recycleItemId, result.getId());
        verify(recycleItemRepository).findById(recycleItemId);
    }

    @Test
    void testSaveRecycleItem() {
        RecycleItem recycleItem = new RecycleItem(1L, "Plastic", 10.0, LocalDateTime.now(), "123 Street", new User(), null);
        when(recycleItemRepository.save(any())).thenReturn(recycleItem);

        RecycleItem createdRecycleItem = recycleItemService.saveRecycleItem(recycleItem);

        assertNotNull(createdRecycleItem);
        assertEquals(recycleItem.getId(), createdRecycleItem.getId());
        verify(recycleItemRepository).save(any());
    }

    @Test
    void testDeleteRecycleItemById() {
        Long recycleItemId = 1L;
        doNothing().when(recycleItemRepository).deleteById(recycleItemId);

        recycleItemService.deleteRecycleItemById(recycleItemId);

        verify(recycleItemRepository).deleteById(recycleItemId);
    }
}
