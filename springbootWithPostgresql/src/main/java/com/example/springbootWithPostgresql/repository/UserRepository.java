package com.example.springbootWithPostgresql.repository;

import com.example.springbootWithPostgresql.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
