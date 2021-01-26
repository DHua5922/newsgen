package com.newsgen.newsgenbackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * This class models favorite news.
 */
@Entity
@Data
public class FavNews {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)    
    private int id;
    private int userId;
    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private String publishedAt;
}
