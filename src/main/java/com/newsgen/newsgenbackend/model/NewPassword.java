package com.newsgen.newsgenbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This models new password information.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewPassword {
    private String token;
    private String password;
    private String cpassword;
}
