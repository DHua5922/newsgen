package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * This class models a new user.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewUser {
    private String username;
    private String email;
    private String password;
    private String cpassword;
}
