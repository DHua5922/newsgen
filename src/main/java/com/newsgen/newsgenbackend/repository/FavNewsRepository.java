package com.newsgen.newsgenbackend.repository;

import java.util.List;

import com.newsgen.newsgenbackend.model.FavNews;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * This repository performs database operations for favorite news.
 */
public interface FavNewsRepository extends JpaRepository<FavNews, Integer> {
    List<FavNews> findByUserId(int userId);
}
