package com.example.springbootWithPostgresql.service;

import com.example.springbootWithPostgresql.entity.UserEntity;

import java.util.List;

public interface UserService {

    List<UserEntity> getAllUser();

    UserEntity getUserById(Long userId);

    void saveUser(UserEntity user);

    void updateUser(UserEntity user, Long userid);

    void deleteUseryId(Long userId);
}
