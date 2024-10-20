package com.example.backend.service;

import com.example.backend.entity.SpecialWaste;
import com.example.backend.repository.SpecialWasteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SpecialWasteServiceTest {

    @Mock
    private SpecialWasteRepository specialWasteRepository;

    @InjectMocks
    private SpecialWasteService specialWasteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllSpecialWaste() {
        SpecialWaste waste = new SpecialWaste();  // Create a sample SpecialWaste object
        when(specialWasteRepository.findAll()).thenReturn(Collections.singletonList(waste));

        List<SpecialWaste> result = specialWasteService.getAllSpecialWaste();

        assertEquals(1, result.size());
        verify(specialWasteRepository).findAll();
    }

    @Test
    void testGetSpecialWasteById() {
        Long wasteId = 1L;
        SpecialWaste waste = new SpecialWaste();
        waste.setId(wasteId);

        when(specialWasteRepository.findById(wasteId)).thenReturn(Optional.of(waste));

        SpecialWaste result = specialWasteService.getSpecialWasteById(wasteId);

        assertNotNull(result);
        assertEquals(wasteId, result.getId());
        verify(specialWasteRepository).findById(wasteId);
    }

    @Test
    void testGetSpecialWasteById_NotFound() {
        Long wasteId = 1L;

        when(specialWasteRepository.findById(wasteId)).thenReturn(Optional.empty());

        SpecialWaste result = specialWasteService.getSpecialWasteById(wasteId);

        assertNull(result);
        verify(specialWasteRepository).findById(wasteId);
    }

    @Test
    void testSaveSpecialWaste() {
        SpecialWaste waste = new SpecialWaste();
        waste.setId(1L);

        when(specialWasteRepository.save(any())).thenReturn(waste);

        SpecialWaste savedWaste = specialWasteService.saveSpecialWaste(waste);

        assertNotNull(savedWaste);
        assertEquals(waste.getId(), savedWaste.getId());
        verify(specialWasteRepository).save(any());
    }

    @Test
    void testDeleteSpecialWasteById() {
        Long wasteId = 1L;

        doNothing().when(specialWasteRepository).deleteById(wasteId);

        specialWasteService.deleteSpecialWasteById(wasteId);

        verify(specialWasteRepository).deleteById(wasteId);
    }
}
