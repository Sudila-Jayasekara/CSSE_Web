package com.example.backend.logger;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LoggerSingletonTest {

    @Test
    void testSingletonInstance() {
        LoggerSingleton firstInstance = LoggerSingleton.getInstance();
        LoggerSingleton secondInstance = LoggerSingleton.getInstance();

        // Verify that both instances are the same
        assertEquals(firstInstance, secondInstance, "LoggerSingleton instances should be the same");
    }

    @Test
    void testGetLogger() {
        LoggerSingleton loggerSingleton = LoggerSingleton.getInstance();
        assertNotNull(loggerSingleton.getLogger(), "Logger should not be null");
    }
}
