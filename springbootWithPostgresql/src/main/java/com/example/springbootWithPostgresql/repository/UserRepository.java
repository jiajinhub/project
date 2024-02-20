package com.example.springbootWithPostgresql.repository;

import com.example.springbootWithPostgresql.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query(value = "select count(1) from usertest", nativeQuery = true)
    int getCount();
}
