package com.newsgen.newsgenbackend.service;

import com.newsgen.newsgenbackend.model.NewUser;
import com.newsgen.newsgenbackend.model.User;
import com.newsgen.newsgenbackend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * This class performs user operations.
 */
@Service
public class MyUserService {

    @Autowired
    private UserRepository repository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public static final int MIN_USERNAME_LENGTH = 5;
    public static final int MIN_PASSWORD_LENGTH = 6;

    /**
     * Creates new user.
     * 
     * @param newUser New user.
     * @return New user.
     */
    public User createUser(NewUser newUser) {
        User user = new User(
            0, 
            newUser.getUsername(), 
            newUser.getEmail(), 
            encodePassword(newUser.getPassword())
        );
        return repository.save(user);
    }

    /**
     * Gets user by username or email.
     * 
     * @param usernameOrEmail User's username or email.
     * @return User with given username or email.
     */
    public User getUser(String usernameOrEmail) {
        return repository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
    }

    /**
     * Checks if the username is valid.
     * 
     * @param username Username.
     * @return True if username is valid or false.
     */
    public boolean isValidUsername(String username) {
        return username.length() >= MIN_USERNAME_LENGTH;
    }

    /**
     * Checks if the email is valid.
     * 
     * @param email Email.
     * @return True if email is valid or false.
     */
    public boolean isValidEmail(String email) {
        return email.matches(".+@.+..+");
    }

    /**
     * Checks if the password is valid.
     * 
     * @param password Password.
     * @return True if password is valid or false.
     */
    public boolean isValidPassword(String password) {
        return password.length() >= MIN_PASSWORD_LENGTH;
    }

    /**
     * Checks if the password matches with confirmed password.
     * 
     * @param password Password.
     * @param cpassword Confirmed password.
     * @return True if password matches with confirmed password or false.
     */
    public boolean isValidPassword(String password, String cpassword) {
        return password.equals(cpassword);
    }

    /**
     * Encodes password.
     * 
     * @param password Password to encode.
     * @return Encoded password.
     */
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * Checks if the passwords match.
     * 
     * @param passwordNotEncoded Password not encoded.
     * @param encodedPassword Encoded password.
     * @return True if the passwords match or false.
     */
    public boolean isPasswordMatch(String passwordNotEncoded, String encodedPassword) {
        return passwordNotEncoded.matches(encodedPassword);
    }

}
