package com.newsgen.newsgenbackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class models favorite news.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
