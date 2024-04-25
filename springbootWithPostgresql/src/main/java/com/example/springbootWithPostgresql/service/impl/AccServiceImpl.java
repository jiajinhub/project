package com.example.springbootWithPostgresql.service.impl;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.pattern.template.UpdateUserTemplate.UpdatePassword;
import com.example.springbootWithPostgresql.pattern.template.UpdateUserTemplate.UpdateTheme;
import com.example.springbootWithPostgresql.repository.AccRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccServiceImpl {

    @Autowired
    private AccRepo accRepo;

    @Autowired
    private UpdatePassword updatePassword;

    @Autowired
    private UpdateTheme updateTheme;

    public AccServiceImpl(UpdatePassword updatePassword, UpdateTheme updateTheme) {
        this.updatePassword = updatePassword;
        this.updateTheme = updateTheme;
    }


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

    // public AccountEntity updateUser(AccountEntity user) {
    //     AccountEntity affectedData;
    //     Optional<AccountEntity> userDetailOpt = accRepo.findById(user.getUserId());
    //     if(userDetailOpt.isPresent()){
    //         AccountEntity userDetail = userDetailOpt.get();
    //         if(userDetail.getEmail().isEmpty())
    //             user.setEmail(userDetail.getEmail());
    //         if(user.getPassword().isEmpty())
    //             user.setPassword(userDetail.getPassword());
    //         user.setHasdarktheme(user.getHasdarktheme());
    //         affectedData = accRepo.save(user);
    //     }else{
    //         throw new RuntimeException("user not found.");
    //     }
    //     return affectedData;
    // }


    public AccountEntity updatePassword(AccountEntity user) {
        return updatePassword.updateUser(user);
    }

    public AccountEntity updateTheme(AccountEntity user) {
        return updateTheme.updateUser(user);
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

    public AccountEntity insertAcc(AccountEntity acc) {
        AccountEntity response = accRepo.save(acc);
        System.out.println("account saved to db with userId : " + response.getUserId());
        return response;
    }

    public void saveAccount(AccountEntity account) {
        AccountEntity accountDetails = accRepo.save(account);
    }

}
