package com.example.springbootWithPostgresql.service.impl;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;
import com.example.springbootWithPostgresql.repository.AccRepo;
import com.example.springbootWithPostgresql.repository.GroceryListRepo;
import com.example.springbootWithPostgresql.repository.ListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GroceryListImpl {

    @Autowired
    private GroceryListRepo groceryListRepo;
    private ListRepo listRepo;

    private AccRepo accRepo;

    public List<Long> getAllUserList(Long id) {
        return groceryListRepo.getUserListsByID(id);
    }
    public String getAccountByID(Long id) {
        Map<String, Object> accountDetails = groceryListRepo.getAccountByID(id);
        if (accountDetails != null) {
            return (String) accountDetails.get("email");
        }else {
            System.out.println("Account not found for ID: " + id);
        }
        return null; // Handle case where accountDetails is null
    }

    public Map<String, Object> getListDetailsByID(Long id){
        return groceryListRepo.getListDetailsByID(id);
    }

    public Integer getTotalProductByID(Long id) {
        return groceryListRepo.getTotalProduct(id);
    }

    public Integer getTotalExpiredProductByID(Long id) {
        return groceryListRepo.getTotalExpiredProduct(id);
    }

    public Integer getTotalExpiringProductByID(Long id) {
        return groceryListRepo.getTotalExpiringProduct(id);
    }

    public void saveList(GroceryListEntity userList) {
        GroceryListEntity userListDetail = groceryListRepo.save(userList);
    }

    public int getListCount() {
        return groceryListRepo.getTotalLists();
    }
}
