package com.newsgen.newsgenbackend.service;

import com.newsgen.newsgenbackend.model.User;
import com.newsgen.newsgenbackend.model.UserLogin;
import com.newsgen.newsgenbackend.security.MyUserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This class performs operations for user details.
 */
@Service
public class MyUserDetailsService implements UserDetailsService {
    
    @Autowired
    private MyUserService userService;

    @Override
    public MyUserDetails loadUserByUsername(String username) {
        User user = userService.getUser(username);

        MyUserDetails userDetails = null;
        if(user != null) {
            UserLogin userLogin = new UserLogin(username, user.getPassword());
            userDetails = new MyUserDetails(userLogin);
        } else {
            throw new UsernameNotFoundException("Incorrect username.");
        }
        
        return userDetails;
    }

}