package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.service.impl.ProdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProdService prodService;
    @RequestMapping(value = "retrieve", method = RequestMethod.GET)
    public List<ProductEntity> getAllProduct(){
        List<ProductEntity> products = prodService.getAllUser();
        System.out.println("products : "+products);
        return products;
    }
}