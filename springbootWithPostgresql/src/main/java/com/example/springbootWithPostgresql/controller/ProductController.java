package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.service.impl.ProdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @RequestMapping(value = "insert", method = RequestMethod.POST)
    public void insertProduct(@RequestBody ProductEntity request){
        prodService.insertProd(request);
    }

    @RequestMapping(value="delete",method = RequestMethod.POST)
    public void deleteAccount(@RequestBody Map<String, Long> requestBody){
        prodService.deleteProd(requestBody.get("userID"));
    }

    @RequestMapping(value="updateAccount", method = RequestMethod.POST)
    public ProductEntity update(@RequestBody ProductEntity updateData){
        ProductEntity affectedRow;
        affectedRow = prodService.updateProd(updateData);
        return affectedRow;
    }
}