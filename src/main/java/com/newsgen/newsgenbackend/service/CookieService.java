package com.newsgen.newsgenbackend.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

/**
 * This class performs cookie operations.
 */
@Service
public class CookieService {
    @Value("${authentication.accessTokenCookieName}")
    private String accessTokenCookieName;

    @Value("${authentication.refreshTokenCookieName}")
    private String refreshTokenCookieName;

    public HttpCookie createAccessTokenCookie(String token, Long duration) {
        return createTokenCookie(token, duration, accessTokenCookieName);
    }

    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
        return createTokenCookie(token, duration, refreshTokenCookieName);
    }

    private HttpCookie createTokenCookie(String token, Long duration, String cookieName) {
        String encryptedToken = SecurityService.encrypt(token);
        return ResponseCookie.from(cookieName, encryptedToken)
                .maxAge(duration)
                .httpOnly(true)
                .sameSite("none")
                .secure(true)
                .path("/")
                .build();
    }

    public Cookie deleteCookie(String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }

    public void deleteAccessTokenCookie(HttpServletResponse response) {
        response.addCookie(deleteCookie(accessTokenCookieName));
    }

    public void deleteRefreshTokenCookie(HttpServletResponse response) {
        response.addCookie(deleteCookie(refreshTokenCookieName));
    }
}
