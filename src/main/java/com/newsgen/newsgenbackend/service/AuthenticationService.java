package com.newsgen.newsgenbackend.service;

import javax.servlet.http.HttpServletResponse;

import com.newsgen.newsgenbackend.model.Message;
import com.newsgen.newsgenbackend.model.Token;
import com.newsgen.newsgenbackend.model.User;
import com.newsgen.newsgenbackend.model.UserLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This class performs authentication operations.
 */
@Service
public class AuthenticationService {

    @Autowired
    private MyUserService userService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CookieService cookieService;

    public ResponseEntity<Message> login(UserLogin loginRequest, String accessToken, String refreshToken) {
        User user = userService.getUser(loginRequest.getUsernameOrEmail());

        if(user == null) {
            throw new UsernameNotFoundException("Username is incorrect.");
        }
        else if(userService.isPasswordMatch(loginRequest.getPassword(), user.getPassword())) {
            throw new UsernameNotFoundException("Password is incorrect.");
        }

        boolean accessTokenValid = tokenService.validateToken(accessToken);
        boolean refreshTokenValid = tokenService.validateToken(refreshToken);

        HttpHeaders responseHeaders = new HttpHeaders();
        Token newAccessToken;
        Token newRefreshToken;
        if (!accessTokenValid && !refreshTokenValid) {
            newAccessToken = tokenService.generateAccessToken(user);
            newRefreshToken = tokenService.generateRefreshToken(user);
            addAccessTokenCookie(responseHeaders, newAccessToken);
            addRefreshTokenCookie(responseHeaders, newRefreshToken);
        } else if (!accessTokenValid && refreshTokenValid) {
            newAccessToken = tokenService.generateAccessToken(user);
            addAccessTokenCookie(responseHeaders, newAccessToken);
        } else if (accessTokenValid && refreshTokenValid) {
            newAccessToken = tokenService.generateAccessToken(user);
            newRefreshToken = tokenService.generateRefreshToken(user);
            addAccessTokenCookie(responseHeaders, newAccessToken);
            addRefreshTokenCookie(responseHeaders, newRefreshToken);
        }

        return ResponseEntity
            .ok()
            .headers(responseHeaders)
            .body(new Message("You are logged in."));
    }

    public Message logout(HttpServletResponse response) {
        cookieService.deleteAccessTokenCookie(response);
        cookieService.deleteRefreshTokenCookie(response);
        return new Message("You have been logged out");
    }

    private void addAccessTokenCookie(HttpHeaders httpHeaders, Token token) {
        httpHeaders.add(
            HttpHeaders.SET_COOKIE, 
            cookieService.createAccessTokenCookie(token.getTokenValue(), token.getDuration()).toString());
    }

    private void addRefreshTokenCookie(HttpHeaders httpHeaders, Token token) {
        httpHeaders.add(
            HttpHeaders.SET_COOKIE, 
            cookieService.createRefreshTokenCookie(token.getTokenValue(), token.getDuration()).toString());
    }
}
