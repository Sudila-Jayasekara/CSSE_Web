package com.example.backend.controller;

import com.example.backend.entity.SpecialWaste;
import com.example.backend.service.SpecialWasteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SpecialWasteControllerTest {

    @Mock
    private SpecialWasteService specialWasteService;

    @InjectMocks
    private SpecialWasteController specialWasteController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllSpecialWaste() {
        SpecialWaste waste = new SpecialWaste();  // Create a sample SpecialWaste object
        when(specialWasteService.getAllSpecialWaste()).thenReturn(Collections.singletonList(waste));

        List<SpecialWaste> result = specialWasteController.getAllSpecialWaste();

        assertEquals(1, result.size());
        verify(specialWasteService).getAllSpecialWaste();
    }

    @Test
    void testGetSpecialWasteById() {
        Long wasteId = 1L;
        SpecialWaste waste = new SpecialWaste();
        waste.setId(wasteId);

        when(specialWasteService.getSpecialWasteById(wasteId)).thenReturn(waste);

        SpecialWaste result = specialWasteController.getSpecialWasteById(wasteId);

        assertNotNull(result);
        assertEquals(wasteId, result.getId());
        verify(specialWasteService).getSpecialWasteById(wasteId);
    }

    @Test
    void testGetSpecialWasteById_NotFound() {
        Long wasteId = 1L;

        when(specialWasteService.getSpecialWasteById(wasteId)).thenReturn(null);

        SpecialWaste result = specialWasteController.getSpecialWasteById(wasteId);

        assertNull(result);
        verify(specialWasteService).getSpecialWasteById(wasteId);
    }

    @Test
    void testSaveSpecialWaste() {
        SpecialWaste waste = new SpecialWaste();
        waste.setId(1L);

        when(specialWasteService.saveSpecialWaste(any())).thenReturn(waste);

        SpecialWaste createdWaste = specialWasteController.saveSpecialWaste(waste);

        assertNotNull(createdWaste);
        assertEquals(waste.getId(), createdWaste.getId());
        verify(specialWasteService).saveSpecialWaste(any());
    }

    @Test
    void testDeleteSpecialWasteById() {
        Long wasteId = 1L;

        doNothing().when(specialWasteService).deleteSpecialWasteById(wasteId);

        specialWasteController.deleteSpecialWasteById(wasteId);

        verify(specialWasteService).deleteSpecialWasteById(wasteId);
    }
}
