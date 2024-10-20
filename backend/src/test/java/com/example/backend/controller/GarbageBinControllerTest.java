package com.example.backend.controller;

import com.example.backend.entity.GarbageBin;
import com.example.backend.service.GarbageBinService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.assertj.core.api.Assertions.assertThat;

public class GarbageBinControllerTest {

    @InjectMocks
    private GarbageBinController garbageBinController;

    @Mock
    private GarbageBinService garbageBinService;

    private GarbageBin garbageBin;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        garbageBin = new GarbageBin();
        garbageBin.setId(1L);
        garbageBin.setName("Test Bin");
        garbageBin.setGarbageLevel(100);
        garbageBin.setAddress("Test Address");
    }

    @Test
    void testGetAllGarbageBins() {
        when(garbageBinService.getAllGarbageBin()).thenReturn(Arrays.asList(garbageBin));

        var bins = garbageBinController.getAllGarbageBin();

        assertThat(bins).isNotEmpty();
        assertThat(bins.size()).isEqualTo(1);
        assertThat(bins.get(0).getName()).isEqualTo("Test Bin");
        verify(garbageBinService, times(1)).getAllGarbageBin();
    }

    @Test
    void testGetGarbageBinById_Success() {
        when(garbageBinService.getGarbageBinById(1L)).thenReturn(garbageBin);

        var foundBin = garbageBinController.getGarbageBinById(1L);

        assertThat(foundBin).isNotNull();
        assertThat(foundBin.getName()).isEqualTo("Test Bin");
        verify(garbageBinService, times(1)).getGarbageBinById(1L);
    }

    @Test
    void testGetGarbageBinById_NotFound() {
        when(garbageBinService.getGarbageBinById(999L)).thenReturn(null);

        var foundBin = garbageBinController.getGarbageBinById(999L);

        assertThat(foundBin).isNull();
        verify(garbageBinService, times(1)).getGarbageBinById(999L);
    }

    @Test
    void testSaveGarbageBin() {
        when(garbageBinService.saveGarbageBin(any(GarbageBin.class))).thenReturn(garbageBin);

        var savedBin = garbageBinController.saveGarbageBin(garbageBin);

        assertThat(savedBin).isNotNull();
        assertThat(savedBin.getName()).isEqualTo("Test Bin");
        verify(garbageBinService, times(1)).saveGarbageBin(any(GarbageBin.class));
    }

    @Test
    void testDeleteGarbageBin() {
        doNothing().when(garbageBinService).deleteGarbageBin(1L);

        garbageBinController.deleteGarbageBin(1L);

        verify(garbageBinService, times(1)).deleteGarbageBin(1L);
    }
}
