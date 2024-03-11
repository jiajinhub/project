package com.example.springbootWithPostgresql.controller;


import com.example.springbootWithPostgresql.entity.UserEntity;
import com.example.springbootWithPostgresql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/test")
    public List<UserEntity> getAllUser(){
        List<UserEntity> users = userService.getAllUser();
        System.out.println("users : "+users);
        return users;
    }

    @RequestMapping("/count")
    public int getUserCount(){
        int count = 0;

        count = userService.getCount();

        return count;
    }

}
