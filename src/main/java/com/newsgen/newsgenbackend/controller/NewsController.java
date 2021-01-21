package com.newsgen.newsgenbackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newsgen.newsgenbackend.model.Message;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

/**
 * This API manages news.
 */
@RestController
@RequestMapping("/news")
public class NewsController {

    @Value("${news_api_key}")
    private String newsApiKey;

    @GetMapping("/top")
    public ResponseEntity<Object> getTopNews() {
        ResponseEntity<Object> response;
        try {
            Mono<String> monoString = WebClient
                .create("https://newsapi.org/v2/")
                .get()
                .uri("top-headlines?country=us&apiKey=" + newsApiKey)
                .retrieve()
                .bodyToMono(String.class);
            String jsonString = monoString.block();
            Object newsResponse = new ObjectMapper().readValue(jsonString, Object.class);
            response = new ResponseEntity<Object>(newsResponse, HttpStatus.OK);  
        } catch(Exception e) {
            Message errorMsg = new Message("Cannot get news");
            response = new ResponseEntity<Object>(errorMsg, 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }
}
