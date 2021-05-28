package com.newsgen.newsgenbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newsgen.newsgenbackend.model.User;

/**
 * This repository performs database operations for user.
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsernameOrEmail(String username, String email);
}
