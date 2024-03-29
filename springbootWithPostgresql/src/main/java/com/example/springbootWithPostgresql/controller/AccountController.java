package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.entity.AccountRequestEntity;
import com.example.springbootWithPostgresql.service.impl.AccServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:9000", "http://localhost:9001"})
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccServiceImpl accService;

    @RequestMapping(value = "retrieve", method = RequestMethod.GET)
    public List<AccountEntity> getAllAccount(){
        List<AccountEntity> users = accService.getAllUser();
        System.out.println("users : "+users);
        return users;
    }

    @RequestMapping("Count")
    public int getCount(){
        return accService.getCount();
    }

    @RequestMapping("retrieveById")
    public AccountEntity getAccById(@RequestBody Map<String, Long> requestBody){
        System.out.println(requestBody.get("userID"));
        return accService.getUserById(requestBody.get("userID"));
    }

    // @PostMapping("updateAccount")
    // public AccountEntity update(@RequestBody AccountEntity update){
    //     AccountEntity affectedRow;
    //     affectedRow = accService.updateUser(update);
    //     return affectedRow;
    // }


    @PostMapping("/updateAccount/password")
    public AccountEntity updatePassword(@RequestBody AccountEntity user) {
        return accService.updatePassword(user);
    }

    @PostMapping("/updateAccount/theme")
    public AccountEntity updateTheme(@RequestBody AccountEntity user) {
        return accService.updateTheme(user);
    }

    @RequestMapping("deleteAccount")
    public void deleteAccount(@RequestBody Map<String, Long> requestBody){
        accService.deleteUserId(requestBody.get("userID"));
    }

    @GetMapping("testCount")
    public int testCount(){
        return accService.getCount();
    }

    //@PostMapping("authenticate")
    //public void authorize(String Username, String password) {

    //if(Username == db.username && password == db.password){
    //return ok
    //}
        //return accService.getCount();
    //}

    @PostMapping("/authenticate")
    public ResponseEntity<AccountEntity> authorize(@RequestBody AccountRequestEntity accountRequest) {
                String email = accountRequest.getEmail();
        String pass = accountRequest.getPassword();
        //AccountEntity account = accService.getUserById(Long.parseLong(username));
        AccountEntity account = accService.getAccountByEmail(email);
        if(account!=null && pass.equals(account.getPassword())){
            return ResponseEntity.ok(account);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AccountEntity());
        }
    }
}
