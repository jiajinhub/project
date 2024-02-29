package com.example.springbootWithPostgresql.repository;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccRepo extends JpaRepository<AccountEntity, Long> {

    @Query(value = "select count(1) from account", nativeQuery = true)
    int getCount();
}
