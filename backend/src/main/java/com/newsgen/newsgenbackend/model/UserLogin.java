package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class models login information.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLogin {
    private String usernameOrEmail;
    private String password;
}
