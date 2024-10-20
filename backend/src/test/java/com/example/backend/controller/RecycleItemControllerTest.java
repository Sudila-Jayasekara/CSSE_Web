package com.example.backend.controller;

import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.User;
import com.example.backend.service.RecycleItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RecycleItemControllerTest {

    @Mock
    private RecycleItemService recycleItemService;

    @InjectMocks
    private RecycleItemController recycleItemController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllRecycleItems() {
        List<RecycleItem> recycleItems = Collections.singletonList(new RecycleItem());
        when(recycleItemService.getAllRecycleItems()).thenReturn(recycleItems);

        List<RecycleItem> result = recycleItemController.getAllRecycleItems();

        assertEquals(1, result.size());
        verify(recycleItemService).getAllRecycleItems();
    }

    @Test
    void testGetRecycleItemById() {
        Long recycleItemId = 1L;
        RecycleItem recycleItem = new RecycleItem(recycleItemId, "Plastic", 10.0, LocalDateTime.now(), "123 Street", new User(), null);
        when(recycleItemService.getRecycleItemById(recycleItemId)).thenReturn(recycleItem);

        RecycleItem result = recycleItemController.getRecycleItemById(recycleItemId);

        assertNotNull(result);
        assertEquals(recycleItemId, result.getId());
        verify(recycleItemService).getRecycleItemById(recycleItemId);
    }

    @Test
    void testSaveRecycleItem() {
        RecycleItem recycleItem = new RecycleItem(1L, "Plastic", 10.0, LocalDateTime.now(), "123 Street", new User(), null);
        when(recycleItemService.saveRecycleItem(any())).thenReturn(recycleItem);

        RecycleItem createdRecycleItem = recycleItemController.saveRecycleItem(recycleItem);

        assertNotNull(createdRecycleItem);
        assertEquals(recycleItem.getId(), createdRecycleItem.getId());
        verify(recycleItemService).saveRecycleItem(any());
    }

    @Test
    void testDeleteRecycleItemById() {
        Long recycleItemId = 1L;
        doNothing().when(recycleItemService).deleteRecycleItemById(recycleItemId);

        recycleItemController.deleteRecycleItemById(recycleItemId);

        verify(recycleItemService).deleteRecycleItemById(recycleItemId);
    }
}
