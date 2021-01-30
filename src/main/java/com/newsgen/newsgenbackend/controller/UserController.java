package com.newsgen.newsgenbackend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;

import com.newsgen.newsgenbackend.model.Message;
import com.newsgen.newsgenbackend.model.NewUser;
import com.newsgen.newsgenbackend.model.Profile;
import com.newsgen.newsgenbackend.model.User;
import com.newsgen.newsgenbackend.service.AuthenticationService;
import com.newsgen.newsgenbackend.service.CookieService;
import com.newsgen.newsgenbackend.service.MyUserService;
import com.newsgen.newsgenbackend.service.SecurityService;
import com.newsgen.newsgenbackend.service.TokenService;

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

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private CookieService cookieService;

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

    @GetMapping("/info")
    public Profile getUser(@CookieValue(name = "accessToken", required = false) String accessToken) {
        int userId = tokenService.getIdFromToken(SecurityService.decrypt(accessToken));
        User user = userService.getUser(userId);
        return new Profile(user.getUsername(), user.getEmail());
    }

    @PatchMapping("/profile")
    public ResponseEntity<Map<String, List<Message>>> updateProfile(
        HttpServletResponse response,
        @CookieValue(name = "accessToken", required = false) String accessToken,
        @RequestBody Profile profile
    ) {
        Map<String, List<Message>> messageMap = new HashMap<String, List<Message>>();
        messageMap.put("username_error", new ArrayList<Message>());
        messageMap.put("username_success", new ArrayList<Message>());
        messageMap.put("email_error", new ArrayList<Message>());
        messageMap.put("email_success", new ArrayList<Message>());

        // Invalid username
        if(!userService.isValidUsername(profile.getUsername()))
            messageMap.get("username_error").add(new Message(Message.Error.USERNAME_LENGTH.getMessage()));
        // Username has been taken
        if(userService.getUser(profile.getUsername()) != null)
            messageMap.get("username_error").add(new Message(Message.Error.USERNAME_TAKEN.getMessage()));
        // Invalid email
        if(!userService.isValidEmail(profile.getEmail()))
            messageMap.get("email_error").add(new Message(Message.Error.EMAIL_INVALID.getMessage()));
        // Email has been taken
        if(userService.getUser(profile.getEmail()) != null)
            messageMap.get("email_error").add(new Message(Message.Error.EMAIL_TAKEN.getMessage()));

        // Update user information in database 
        int userId = tokenService.getIdFromToken(SecurityService.decrypt(accessToken));
        User updatedUser = userService.getUser(userId);
        if(messageMap.get("username_error").size() == 0) {
            // Valid username
            updatedUser.setUsername(profile.getUsername());
            messageMap.get("username_success").add(new Message("Username has been updated"));
        }
        if(messageMap.get("email_error").size() == 0) {
            // Valid email
            updatedUser.setEmail(profile.getEmail());
            messageMap.get("email_success").add(new Message("Email has been updated"));
        }
        updatedUser = userService.updateUser(updatedUser);

        // Update access and refresh tokens to 
        // use updated user information
        HttpHeaders responseHeaders = new HttpHeaders();
        authenticationService.addAccessTokenCookie(responseHeaders, 
            tokenService.generateAccessToken(updatedUser));
        authenticationService.addRefreshTokenCookie(responseHeaders, 
            tokenService.generateRefreshToken(updatedUser));

        return ResponseEntity
            .ok()
            .headers(responseHeaders)
            .body(messageMap);
    }

    @DeleteMapping("/delete")
    public void deleteUser(
        HttpServletResponse response,
        @CookieValue(name = "accessToken", required = false) String accessToken
    ) {
        int userId = tokenService.getIdFromToken(SecurityService.decrypt(accessToken));
        userService.deleteUser(userId);
        cookieService.deleteAccessTokenCookie(response);
        cookieService.deleteRefreshTokenCookie(response);
    }
}
