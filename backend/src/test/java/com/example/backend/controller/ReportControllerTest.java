package com.example.backend.controller;

import com.example.backend.entity.Report;
import com.example.backend.service.ReportService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ReportControllerTest {

    @Mock
    private ReportService reportService;

    @InjectMocks
    private ReportController reportController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateReport() {
        Report report = new Report();
        report.setId(1L);

        when(reportService.saveReport(any())).thenReturn(report);

        Report createdReport = reportController.createReport(report);

        assertNotNull(createdReport);
        assertEquals(report.getId(), createdReport.getId());
        verify(reportService).saveReport(any());
    }

    @Test
    void testGetAllReports() {
        List<Report> reports = Collections.singletonList(new Report());

        when(reportService.getAllReports()).thenReturn(reports);

        List<Report> result = reportController.getAllReports();

        assertEquals(1, result.size());
        verify(reportService).getAllReports();
    }

    @Test
    void testGetReportById() {
        Long reportId = 1L;
        Report report = new Report();
        report.setId(reportId);

        when(reportService.getReportById(reportId)).thenReturn(report);

        Report result = reportController.getReportById(reportId);

        assertNotNull(result);
        assertEquals(reportId, result.getId());
        verify(reportService).getReportById(reportId);
    }



    @Test
    void testUpdateReport() {
        Long reportId = 1L;
        Report report = new Report();
        report.setId(reportId);

        when(reportService.saveReport(any())).thenReturn(report);

        Report updatedReport = reportController.updateReport(reportId, report);

        assertNotNull(updatedReport);
        assertEquals(reportId, updatedReport.getId());
        verify(reportService).saveReport(any());
    }

    @Test
    void testDeleteReport() {
        Long reportId = 1L;

        doNothing().when(reportService).deleteReportById(reportId);

        reportController.deleteReport(reportId);

        verify(reportService).deleteReportById(reportId);
    }
}
