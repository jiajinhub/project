package com.example.springbootWithPostgresql.service;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;

import java.util.List;
import java.util.Map;

public interface GroceryListService {

    public List<Long> getAllUserList(Long id);
    public String getAccountByID(Long id);

    public Map<String, Object> getListDetailsByID(Long id);

    public Integer getTotalProductByID(Long id);

    public Integer getTotalExpiredProductByID(Long id);

    public Integer getTotalExpiringProductByID(Long id);

    public void saveList(GroceryListEntity userList);

    public int getListCount();

    public void deleteUserList(Long userID, Long listID);
}
