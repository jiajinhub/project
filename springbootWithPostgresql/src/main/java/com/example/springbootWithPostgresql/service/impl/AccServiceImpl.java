package com.example.springbootWithPostgresql.service.impl;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.repository.AccRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccServiceImpl {

    @Autowired
    private AccRepo accRepo;


    public List<AccountEntity> getAllUser() {
        return accRepo.findAll();
    }


    public AccountEntity getUserById(Long userId) {
        Optional<AccountEntity> userOpt = accRepo.findById(userId);
        if(userOpt.isPresent())
            return userOpt.get();
        else
            throw new RuntimeException("user not found.");
    }


    public void saveUser(AccountEntity user) {
        AccountEntity userDetail = accRepo.save(user);
        System.out.println("user saved to db with userId : " + userDetail.getUserId());
    }

    public AccountEntity updateUser(AccountEntity user) {
        AccountEntity affectedData;
        Optional<AccountEntity> userDetailOpt = accRepo.findById(user.getUserId());
        if(userDetailOpt.isPresent()){
            AccountEntity userDetail = userDetailOpt.get();
            if(user.getEmail() != null || user.getEmail().isEmpty())
                userDetail.setEmail(user.getEmail());
            if(user.getPassword() != null || user.getPassword().isEmpty())
                userDetail.setPassword(user.getPassword());
            affectedData = accRepo.save(userDetail);
        }else{
            throw new RuntimeException("user not found.");
        }
        return affectedData;
    }

    public void deleteUserId(Long userId) {
        Optional<AccountEntity> userOpt = accRepo.findById(userId);
        if(userOpt.isPresent())
            accRepo.deleteById(userId);
        else
            throw new RuntimeException("user not found.");
    }

    public int getCount(){
        int count = 0;

        count = accRepo.getCount();

        return count;
    }

    public AccountEntity getAccountByEmail(String email){
        return accRepo.getAccountByEmail(email);
    }

}
