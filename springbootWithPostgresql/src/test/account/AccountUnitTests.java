package com.example.springbootWithPostgresql.account;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.service.impl.AccServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class AccountUnitTests {

    @Autowired
    private AccServiceImpl accService;

    @Test
    void contextLoads() {
    }

    @Test
    void givenUserExists_whenUserIsRetrieved_thenReturnUser(){
        AccountEntity user = accService.getUserById(1L);
        System.out.println(user.toString());
        System.out.println(accService.getUserById(1L).toString());
        assertEquals(user.toString(), accService.getUserById(1L).toString());
    }

    @Test
    void givenUserDoesntExist_whenNonExistingUserIdIsRetrieved_thenReturnRunTimeException(){
        assertThrows(RuntimeException.class, () -> accService.getUserById(9L));
    }




}
