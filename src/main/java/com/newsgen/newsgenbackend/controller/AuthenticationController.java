package com.newsgen.newsgenbackend.controller;

import javax.servlet.http.HttpServletResponse;

import com.newsgen.newsgenbackend.model.Message;
import com.newsgen.newsgenbackend.model.Token;
import com.newsgen.newsgenbackend.model.User;
import com.newsgen.newsgenbackend.model.UserLogin;
import com.newsgen.newsgenbackend.service.AuthenticationService;
import com.newsgen.newsgenbackend.service.MyUserService;
import com.newsgen.newsgenbackend.service.SecurityService;
import com.newsgen.newsgenbackend.service.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This API manages authentication.
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthenticationService authService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private MyUserService userService;

    @PostMapping("/login")
    public ResponseEntity<Message> login(
        @CookieValue(name = "accessToken", required = false) String accessToken,
        @CookieValue(name = "refreshToken", required = false) String refreshToken,
        @RequestBody UserLogin userLogin
    ) {
        ResponseEntity<Message> response;

        try {
            Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userLogin.getUsernameOrEmail(), 
                                                                        userLogin.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String decryptedAccessToken = SecurityService.decrypt(accessToken);
            String decryptedRefreshToken = SecurityService.decrypt(refreshToken);
            response = authService.login(userLogin, decryptedAccessToken, decryptedRefreshToken);
        } catch(UsernameNotFoundException e) {
            response = ResponseEntity
                .badRequest()
                .body(new Message(e.getMessage()));
        } catch(Exception e) {
            response = ResponseEntity
                .status(500)
                .body(new Message("There was a problem logging you in. Please try again."));
        }

        return response;
    }

    @PostMapping("/logout")
    public ResponseEntity<Message> logout(HttpServletResponse response) {
        return ResponseEntity
            .ok()
            .headers(new HttpHeaders())
            .body(authService.logout(response));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<String> refreshToken(
        @CookieValue(name = "refreshToken", required = true) String refreshToken
    ) {
        int userId = tokenService.getIdFromToken(SecurityService.decrypt(refreshToken));
        User user = userService.getUser(userId);
        Token newAccessToken = tokenService.generateAccessToken(user);
        Token newRefreshToken = tokenService.generateRefreshToken(user);
        HttpHeaders responseHeaders = new HttpHeaders();
        authService.addAccessTokenCookie(responseHeaders, newAccessToken);
        authService.addRefreshTokenCookie(responseHeaders, newRefreshToken);
        return ResponseEntity.ok().headers(responseHeaders).body("");
    }
}
