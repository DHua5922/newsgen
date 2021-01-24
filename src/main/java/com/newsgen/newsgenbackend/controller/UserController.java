package com.newsgen.newsgenbackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;

import com.newsgen.newsgenbackend.model.Message;
import com.newsgen.newsgenbackend.model.NewUser;
import com.newsgen.newsgenbackend.service.MyUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This API manages users.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private MyUserService userService;

    @PostMapping("/signup")
    public ResponseEntity<List<Message>> signup(@RequestBody NewUser newUser) {
        List<Message> messageList = new ArrayList<Message>();

        // Invalid username
        if(!userService.isValidUsername(newUser.getUsername()))
            messageList.add(new Message("Username must be at least " + MyUserService.MIN_USERNAME_LENGTH + " characters."));
        // Invalid email
        if(!userService.isValidEmail(newUser.getEmail()))
            messageList.add(new Message("Email is not valid."));
        // Invalid password
        if(!userService.isValidPassword(newUser.getPassword()))
            messageList.add(new Message("Password must be at least " + MyUserService.MIN_PASSWORD_LENGTH + " characters"));
        // Passwords do not match
        if(!userService.isValidPassword(newUser.getPassword(), newUser.getCpassword()))
            messageList.add(new Message("Passwords do not match."));
        // Email has been taken
        if(userService.getUser(newUser.getEmail()) != null)
            messageList.add(new Message("Email has already been taken."));
        // Username has been taken
        if(userService.getUser(newUser.getUsername()) != null)
            messageList.add(new Message("Username has already been taken."));

        HttpStatus statusCode = HttpStatus.BAD_REQUEST;
        if(messageList.size() == 0) {
            // Create new user if information is valid
            userService.createUser(newUser);
            messageList.add(new Message("User has been created!"));
            statusCode = HttpStatus.CREATED;
        }

        return new ResponseEntity<List<Message>>(messageList, statusCode);
    }
}
