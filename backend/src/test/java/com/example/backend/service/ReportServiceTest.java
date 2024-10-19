package com.example.backend.service;

import com.example.backend.entity.Report;
import com.example.backend.repository.ReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ReportServiceTest {

    @Mock
    private ReportRepository reportRepository;

    @InjectMocks
    private ReportService reportService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveReport() {
        Report report = new Report();
        report.setId(1L);

        when(reportRepository.save(any())).thenReturn(report);

        Report savedReport = reportService.saveReport(report);

        assertNotNull(savedReport);
        assertEquals(report.getId(), savedReport.getId());
        verify(reportRepository).save(any());
    }


    @Test
    void testGetReportById() {
        Long reportId = 1L;
        Report report = new Report();
        report.setId(reportId);

        when(reportRepository.findById(reportId)).thenReturn(Optional.of(report));

        Report result = reportService.getReportById(reportId);

        assertNotNull(result);
        assertEquals(reportId, result.getId());
        verify(reportRepository).findById(reportId);
    }

    @Test
    void testGetReportById_NotFound() {
        Long reportId = 1L;

        when(reportRepository.findById(reportId)).thenReturn(Optional.empty());

        Report result = reportService.getReportById(reportId);

        assertNull(result);
        verify(reportRepository).findById(reportId);
    }



    @Test
    void testDeleteReportById() {
        Long reportId = 1L;
        doNothing().when(reportRepository).deleteById(reportId);

        reportService.deleteReportById(reportId);

        verify(reportRepository).deleteById(reportId);
    }
}
