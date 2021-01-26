package com.newsgen.newsgenbackend.service;

import java.util.List;

import com.newsgen.newsgenbackend.model.FavNews;
import com.newsgen.newsgenbackend.repository.FavNewsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This class performs favorite news operations.
 */
@Service
public class FavNewsService {
    @Autowired
    private FavNewsRepository favNewsRepository;

    /**
     * Gets all of the user's favorite news.
     * 
     * @param userId User id.
     * @return All of the user's favorite news.
     */
    public List<FavNews> getFavoriteNews(int userId) {
        return favNewsRepository.findByUserId(userId);
    }
}
