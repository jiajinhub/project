package com.example.springbootWithPostgresql.service.impl;


import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.repository.ProdRepo;
import jdk.jfr.Enabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ProdService {

    @Autowired
    ProdRepo prodRepo;

    @Autowired
    EmailService emailService;

    public List<ProductEntity> getAllUser() {
        return prodRepo.findAll();
    }
    @Scheduled(fixedRate = 60000)
    public void sendEmail(){

        Date currentDate = new Date(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yy HH:mm");
        String formattedDate = dateFormat.format(currentDate);

        String to = "jiajintest123123@gmail.com";
        String subject = "Test Email";
        String text = "This is a test email from batch. "  + formattedDate;
        emailService.sendSimpleMessage(to, subject, text);
        System.out.println("Successfully send " + formattedDate);
    }
}
