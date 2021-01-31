package com.newsgen.newsgenbackend.controller;

import com.newsgen.newsgenbackend.model.Message;
import com.newsgen.newsgenbackend.model.Token;
import com.newsgen.newsgenbackend.model.User;
import com.newsgen.newsgenbackend.service.DateService;
import com.newsgen.newsgenbackend.service.MyUserService;
import com.newsgen.newsgenbackend.service.SecurityService;
import com.newsgen.newsgenbackend.service.TokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;

/**
 * This API manages user's password.
 */
@RestController
@RequestMapping("/password")
public class PasswordController {

    @Value("${mailjet.publicAPIKey}")
    private String publicKey;

    @Value("${mailjet.privateAPIKey}")
    private String privateKey;

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/sendemail")
    public ResponseEntity<Message> sendEmail(@RequestBody User email) {
        ResponseEntity<Message> response;

        try {
            User user = myUserService.getUser(email.getEmail());
            if(user == null)
                throw new MailjetException("No user with that email exists.");

            Token accessToken = tokenService.generateAccessToken(user); 
            String link = "https://newsgen.herokuapp.com/password/reset?token=" + 
                SecurityService.encrypt(accessToken.getTokenValue());

            TransactionalEmail message1 = TransactionalEmail
                .builder()
                .to(new SendContact(user.getEmail()))
                .from(new SendContact("hua.dylan@gmail.com"))
                .htmlPart(
                    "<div>" +
                        "You have requested to change your password. " +
                        "Click <a href='" + link + "'>here</a>" +
                        " to change your password. " +
                        "The link will expire on " + DateService.format(accessToken.getExpiryDate(), "MMMM dd, yyyy 'at' hh:mm a") + ". " +
                        "If you did not request to change your password, please disregard this email." +
                    "</div>"
                )
                .subject("Reset Password")
                .build();
            SendEmailsRequest request = SendEmailsRequest
                .builder()
                .message(message1) // you can add up to 50 messages per request
                .build();
            ClientOptions options = ClientOptions
                .builder()
                .apiKey(publicKey)
                .apiSecretKey(privateKey)
                .build();
            request.sendWith(new MailjetClient(options));

            response = ResponseEntity.ok().body(new Message(
                "Link for resetting your password has been sent to " + user.getEmail() + 
                ". You may need to check your spam folder."));
        } catch(MailjetException e) {
            response = ResponseEntity.badRequest().body(new Message(e.getMessage()));
        }   

        return response;
    }
}
