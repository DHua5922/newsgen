package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class models the user's profile.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
    private String username;
    private String email;
}
