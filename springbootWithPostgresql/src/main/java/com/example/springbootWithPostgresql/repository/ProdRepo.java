package com.example.springbootWithPostgresql.repository;


import com.example.springbootWithPostgresql.entity.ExpiryNotify;
import com.example.springbootWithPostgresql.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdRepo extends JpaRepository<ProductEntity, Long> {

    @Query(value = "select a.email as email, a.name as \"user\",p.name as prodName, p.quantity as quantity, l.name as listName from product p , userlist u , account a, list l" +
            "where p.list_id  = u.list_id" +
            "and p.list_id = l.list_id" +
            "and u.user_id = a.user_id" +
            "and p.expiry_date = CURRENT_DATE; --email, name, item name, quantity, list name", nativeQuery = true)
    List<ExpiryNotify> getExpiryNotificationBatch();

}
