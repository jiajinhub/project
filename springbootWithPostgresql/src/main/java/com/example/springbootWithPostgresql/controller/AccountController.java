package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.entity.AccountRequestEntity;
import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.pattern.strategy.EmailValidationStrategy;
import com.example.springbootWithPostgresql.pattern.strategy.PasswordValidationStrategy;
import com.example.springbootWithPostgresql.pattern.strategy.ResponseMessage;
import com.example.springbootWithPostgresql.pattern.strategy.ValidationStrategy;
import com.example.springbootWithPostgresql.service.impl.AccServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    private ValidationStrategy passwordValidationStrategy = new PasswordValidationStrategy();
    private ValidationStrategy emailValidationStrategy = new EmailValidationStrategy();

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

//    @RequestMapping(value = "insert", method = RequestMethod.POST)
//    @PostMapping("insertAccount")
//    public void insertAccount(@RequestBody AccountEntity request){
//        accService.insertAcc(request);
//    }
    @PostMapping("insertAccount")
    public ResponseEntity<ResponseMessage> insertAccount(@RequestBody AccountEntity request){
    String pass = request.getPassword();
    String email = request.getEmail();

    // Validate the password
    boolean isPasswordValid  = passwordValidationStrategy.validate(pass);
    if (!isPasswordValid ) {
//        System.out.println(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Invalid password. Password must be at least 8 characters long.")));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Invalid password. Password must be at least 8 characters long."));
    }
    // Validate the email
    boolean isEmailValid = emailValidationStrategy.validate(email);
    if (!isEmailValid) {
        return ResponseEntity.badRequest().body(new ResponseMessage("Invalid email address."));
    }

    accService.insertAcc(request);
        return ResponseEntity.ok(new ResponseMessage("Account created successfully."));
}

    @RequestMapping("deleteAccount")
    public void deleteAccount(@RequestBody Map<String, Long> requestBody){
        accService.deleteUserId(requestBody.get("userID"));
    }

    @GetMapping("testCount")
    public int testCount(){
        return accService.getCount();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AccountEntity> authorize(@RequestBody AccountRequestEntity accountRequest) {
                String email = accountRequest.getEmail();
                String pass = accountRequest.getPassword();
        AccountEntity account = accService.getAccountByEmail(email);
        if(account!=null && pass.equals(account.getPassword())){
            return ResponseEntity.ok(account);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AccountEntity());
        }
    }

    @RequestMapping("/checkUser")
    public ResponseEntity<Map<String, Object>> checkUserExist(@RequestParam("mail") String email) {
        AccountEntity account = accService.getAccountByEmail(email);
        if(account!=null){
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody AccountRequestEntity accountRequest) {
        String email = accountRequest.getEmail();
        String newPassword = accountRequest.getPassword();

        System.out.println("resetPassword: " + accountRequest);

        AccountEntity account = accService.getAccountByEmail(email);
        account.setPassword(newPassword);

        try {
            accService.saveAccount(account);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
