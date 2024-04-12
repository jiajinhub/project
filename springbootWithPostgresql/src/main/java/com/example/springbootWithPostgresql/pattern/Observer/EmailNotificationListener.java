package com.example.springbootWithPostgresql.pattern.Observer;

import com.example.springbootWithPostgresql.entity.ExpiryNotify;
import com.example.springbootWithPostgresql.service.impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class EmailNotificationListener implements Observer{

    @Autowired
    private EmailService emailService;

    @Override
    public void update(ExpiryNotify expiry) {
        Date currentDate = new Date(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy HH:mm");
        String formattedDate = dateFormat.format(currentDate);

        String to = expiry.getEmail();
        String subject = "Product Expiry Notification";
        String text = "Hi " + expiry.getUser() + ",\n" +
                "The product '" + expiry.getProdName() + "' will expire at " + formattedDate + ". " +
                "Please use it before it expires. You have " + expiry.getQuantity() + " left.";
        // Call method to send email
        sendEmail(to, subject, text);
    }

    private void sendEmail(String to, String subject, String text) {
        // Implement email sending logic here
        emailService.sendExpiryMessage(to, subject, text);
        System.out.println("Sending email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Text: " + text);
    }
}
