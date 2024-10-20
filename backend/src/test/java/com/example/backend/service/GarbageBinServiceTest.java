package com.example.backend.service;

import com.example.backend.entity.GarbageBin;
import com.example.backend.repository.GarbageBinRepository;
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

public class GarbageBinServiceTest {

    @InjectMocks
    private GarbageBinService garbageBinService;

    @Mock
    private GarbageBinRepository garbageBinRepository;

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
        when(garbageBinRepository.findAll()).thenReturn(Arrays.asList(garbageBin));

        var bins = garbageBinService.getAllGarbageBin();

        assertThat(bins).isNotEmpty();
        assertThat(bins.size()).isEqualTo(1);
        assertThat(bins.get(0).getName()).isEqualTo("Test Bin");
        verify(garbageBinRepository, times(1)).findAll();
    }

    @Test
    void testGetGarbageBinById_Success() {
        when(garbageBinRepository.findById(1L)).thenReturn(Optional.of(garbageBin));

        var foundBin = garbageBinService.getGarbageBinById(1L);

        assertThat(foundBin).isNotNull();
        assertThat(foundBin.getName()).isEqualTo("Test Bin");
        verify(garbageBinRepository, times(1)).findById(1L);
    }

    @Test
    void testGetGarbageBinById_NotFound() {
        when(garbageBinRepository.findById(999L)).thenReturn(Optional.empty());

        var foundBin = garbageBinService.getGarbageBinById(999L);

        assertThat(foundBin).isNull();
        verify(garbageBinRepository, times(1)).findById(999L);
    }

    @Test
    void testSaveGarbageBin() {
        when(garbageBinRepository.save(any(GarbageBin.class))).thenReturn(garbageBin);

        var savedBin = garbageBinService.saveGarbageBin(garbageBin);

        assertThat(savedBin).isNotNull();
        assertThat(savedBin.getName()).isEqualTo("Test Bin");
        verify(garbageBinRepository, times(1)).save(any(GarbageBin.class));
    }

    @Test
    void testDeleteGarbageBin() {
        doNothing().when(garbageBinRepository).deleteById(1L);

        garbageBinService.deleteGarbageBin(1L);

        verify(garbageBinRepository, times(1)).deleteById(1L);
    }

    @Test
    void testUpdateGarbageBin() {
        when(garbageBinRepository.findById(1L)).thenReturn(Optional.of(garbageBin));
        when(garbageBinRepository.save(any(GarbageBin.class))).thenReturn(garbageBin);

        GarbageBin updatedBin = new GarbageBin();
        updatedBin.setName("Updated Bin");
        updatedBin.setGarbageLevel(50);

        var result = garbageBinService.updateGarbageBin(1L, updatedBin);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Updated Bin");
        verify(garbageBinRepository, times(1)).save(any(GarbageBin.class));
    }
}
