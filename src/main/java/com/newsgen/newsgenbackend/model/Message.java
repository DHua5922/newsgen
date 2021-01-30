package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.newsgen.newsgenbackend.service.MyUserService;

/**
 * This class models the response message.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String message; 
    
    /**
     * This enum has fixed messages.
     */
    @AllArgsConstructor
    @Getter
    public enum Error {
        USERNAME_LENGTH("Username must be at least " + MyUserService.MIN_USERNAME_LENGTH + " characters."), 
        USERNAME_TAKEN("Username has already been taken."), 
        EMAIL_INVALID("Email is not valid."), 
        EMAIL_TAKEN("Email has already been taken.");

        private String message;
    }
}
