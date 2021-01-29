package com.newsgen.newsgenbackend.controller;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newsgen.newsgenbackend.model.FavNews;
import com.newsgen.newsgenbackend.model.Message;
import com.newsgen.newsgenbackend.model.News;
import com.newsgen.newsgenbackend.service.FavNewsService;
import com.newsgen.newsgenbackend.service.SecurityService;
import com.newsgen.newsgenbackend.service.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @Autowired
    private TokenService tokenService;

    @Autowired
    private FavNewsService favNewsService;

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

    @GetMapping("/favorite")
    public List<FavNews> getFavoriteNews(
        @CookieValue(name = "accessToken", required = true) String accessToken
    ) {
        int userId = tokenService.getIdFromToken(SecurityService.decrypt(accessToken));
        return favNewsService.getFavoriteNews(userId);
    }

    @PostMapping("/mark")
    public FavNews markFavNews(
        @CookieValue(name = "accessToken", required = true) String accessToken,
        @RequestBody News news
    ) {
        int userId = tokenService.getIdFromToken(SecurityService.decrypt(accessToken));
        return favNewsService.markFavoriteNews(news, userId);
    }

    @DeleteMapping("/delete")
    public void deleteFavNews(@RequestParam int id) {
        favNewsService.deleteFavoriteNews(id);
    }
}
