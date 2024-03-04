package com.example.springbootWithPostgresql.controller;
import com.example.springbootWithPostgresql.service.impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public void sendEmail() {
        String to = "jiajintest123123@gmail.com";
        String subject = "Test Email";
        String text = "This is a test email.";
        emailService.sendSimpleMessage(to, subject, text);
    }

}
