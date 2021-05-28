package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class models the News information from News API.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class News {
    private Source source;
    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private String publishedAt;
    private String content;
}
