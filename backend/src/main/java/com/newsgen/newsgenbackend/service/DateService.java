package com.newsgen.newsgenbackend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

/**
 * This service performs date operations.
 */
@Service
public class DateService {
    /**
     * Formats the time based on the desired format.
     * 
     * @param localDateTime Given time.
     * @param format Desired format.
     * @return Formatted time.
     */
    public static String format(LocalDateTime localDateTime, String format) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
        return localDateTime.format(formatter);
    }
}
