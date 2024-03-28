package com.example.springbootWithPostgresql.repository;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface GroceryListRepo extends JpaRepository<GroceryListEntity, Long> {
    @Query(value = "select list_id from userlist where user_id = ?1", nativeQuery = true)
    List<Long> getUserListsByID(Long id);

    @Query(value = "select email from account where user_id = ?1", nativeQuery = true)
    Map<String, Object> getAccountByID(Long id);

    @Query(value = "select list_id, name, description from list where list_id = ?1", nativeQuery = true)
    Map<String, Object> getListDetailsByID(Long id);

    @Query(value = "select count(1) from product where list_id = ?1", nativeQuery = true)
    int getTotalProduct(Long id);

    @Query(value = "select count(1) from product where list_id = ?1 and expiry_date < CURRENT_DATE", nativeQuery = true)
    int getTotalExpiredProduct(Long id);

    @Query(value = "select count(1) from product where list_id = ?1 and expiry_date < CURRENT_DATE + 7 and expiry_date > CURRENT_DATE", nativeQuery = true)
    int getTotalExpiringProduct(Long id);

    @Query(value = "select count(1) from list", nativeQuery = true)
    int getTotalLists();
}
