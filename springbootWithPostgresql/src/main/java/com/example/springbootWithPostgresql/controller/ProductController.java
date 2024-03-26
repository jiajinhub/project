package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.service.impl.ProdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:9000", "http://localhost:9001"})
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProdService prodService;
    @RequestMapping(value = "retrieve", method = RequestMethod.GET)
    public List<ProductEntity> getAllProduct(){
        List<ProductEntity> products = prodService.getAllProduct();
        return products;
    }

    @RequestMapping(value = "insert", method = RequestMethod.POST)
    public void insertProduct(@RequestBody ProductEntity request){
        prodService.insertProd(request);
    }

    @RequestMapping(value="delete")
    public void deleteProduct(@RequestBody Map<String, Integer> requestBody){
        prodService.deleteProd(requestBody.get("productId"));
    }

    @RequestMapping(value="updateProduct", method = RequestMethod.POST)
    public ProductEntity update(@RequestBody ProductEntity updateData){
        ProductEntity affectedRow;
        affectedRow = prodService.updateProd(updateData);
        return affectedRow;
    }

    @GetMapping("/{productId}")
    public ProductEntity getProdById(@PathVariable int productId){
        System.out.println(prodService.getProdById(productId));
        return prodService.getProdById(productId);
    }

}