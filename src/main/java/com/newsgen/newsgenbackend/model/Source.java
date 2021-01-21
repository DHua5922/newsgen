package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class models the news source.
 */
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Source {
    private String id;
    private String name;
}
