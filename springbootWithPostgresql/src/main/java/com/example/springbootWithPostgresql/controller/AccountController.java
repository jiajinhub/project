package com.example.springbootWithPostgresql.controller;


import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.entity.UserEntity;
import com.example.springbootWithPostgresql.service.impl.AccServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccServiceImpl accService;

    @RequestMapping("Retrieve")
    public List<AccountEntity> getAllAccount(){
        List<AccountEntity> users = accService.getAllUser();
        System.out.println("users : "+users);
        return users;
    }

    @RequestMapping("Count")
    public int getCount(){
        return accService.getCount();
    }

    @RequestMapping("retrieveById")
    public AccountEntity getAccById(@RequestBody Map<String, Long> requestBody){
        System.out.println(requestBody.get("userID"));
        return accService.getUserById(requestBody.get("userID"));
    }

}
