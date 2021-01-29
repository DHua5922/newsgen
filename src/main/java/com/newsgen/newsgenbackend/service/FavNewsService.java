package com.newsgen.newsgenbackend.service;

import java.util.List;

import com.newsgen.newsgenbackend.model.FavNews;
import com.newsgen.newsgenbackend.model.News;
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

    /**
     * Marks news as user's favorite.
     * 
     * @param news News to mark as favorite.
     * @param userId User's id.
     * @return Favorited news.
     */
    public FavNews markFavoriteNews(News news, int userId) {
        FavNews favNews = new FavNews(
            0,
            userId,
            news.getAuthor(),
            news.getTitle(),
            news.getDescription(),
            news.getUrl(),
            news.getUrlToImage(),
            news.getPublishedAt()
        );
        return favNewsRepository.save(favNews);
    }

    /**
     * Deletes favorite news.
     * 
     * @param newsId News id.
     */
    public void deleteFavoriteNews(int newsId) {
        favNewsRepository.deleteById(newsId);
    }
}
