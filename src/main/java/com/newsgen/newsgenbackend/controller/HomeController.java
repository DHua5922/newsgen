package com.newsgen.newsgenbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This API verifies that the application works.
 */
@RestController
public class HomeController {
    @GetMapping
    public String printMessage() {
        return "newsgen-backend API is working!";
    }
}
