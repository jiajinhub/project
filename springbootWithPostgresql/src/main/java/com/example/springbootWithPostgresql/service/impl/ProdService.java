package com.example.springbootWithPostgresql.service.impl;


import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.repository.ProdRepo;
import jdk.jfr.Enabled;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProdService {

    @Autowired
    ProdRepo prodRepo;

    @Autowired
    EmailService emailService;

    public List<ProductEntity> getAllUser() {
        return prodRepo.findAll();
    }

    public ProductEntity insertProd(ProductEntity prod) {
        ProductEntity response = prodRepo.save(prod);
        System.out.println("prod saved to db with prodId : " + response.getProductId());
        return response;
    }

    public ProductEntity updateProd(ProductEntity prod) {
        ProductEntity affectedData;
        Optional<ProductEntity> prodDetailOpt = prodRepo.findById(prod.getProductId());
        if(prodDetailOpt.isPresent()){
            ProductEntity prodDetail = prodDetailOpt.get();
            if(prod.getName() != null || prod.getName().isEmpty())
                prodDetail.setName(prod.getName());
            if(prod.getExpiryDate() != null)
                prodDetail.setExpiryDate(prod.getExpiryDate());
            affectedData = prodRepo.save(prodDetail);
        }else{
            throw new RuntimeException("prod not found.");
        }
        return affectedData;
    }

    public void deleteProd(Long prodId) {
        Optional<ProductEntity> userOpt = prodRepo.findById(prodId);
        if(userOpt.isPresent())
            prodRepo.deleteById(prodId);
        else
            throw new RuntimeException("prod not found.");
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
