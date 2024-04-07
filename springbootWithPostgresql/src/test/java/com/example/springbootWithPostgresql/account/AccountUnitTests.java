package com.example.springbootWithPostgresql.account;

import com.example.springbootWithPostgresql.controller.AccountController;
import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.pattern.strategy.EmailValidationStrategy;
import com.example.springbootWithPostgresql.pattern.strategy.ResponseMessage;
import com.example.springbootWithPostgresql.repository.AccRepo;
import com.example.springbootWithPostgresql.service.impl.AccServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@SpringBootTest
class AccountUnitTests {

    @MockBean
    private AccRepo accRepo;

    private AccountController accountController;

    @Mock
    private EmailValidationStrategy emailValidationStrategy;

    @Autowired
    private AccServiceImpl accService;

    @Test
    void contextLoads() {
    }

    @Test
    void givenUserExists_whenUserIsRetrieved_thenReturnUser() {
        AccountEntity user = accService.getUserById(1L);
        System.out.println(user.toString());
        System.out.println(accService.getUserById(1L).toString());
        assertEquals(user.toString(), accService.getUserById(1L).toString());
    }

    @Test
    void givenUserDoesntExist_whenNonExistingUserIdIsRetrieved_thenReturnRunTimeException() {
        assertThrows(RuntimeException.class, () -> accService.getUserById(9L));
    }

    @Test
    public void testInsertAcc_Success() {
        // Given
        AccountEntity acc = new AccountEntity();
        acc.setEmail("aaa@gmail.com");
        acc.setHasdarktheme(false);
        acc.setPassword("123456789");
        acc.setUserId(1L);
        when(accRepo.save(any(AccountEntity.class))).thenReturn(acc);

        // When
        AccountEntity response = accService.insertAcc(acc);

        // Then
        verify(accRepo, times(1)).save(acc);
        assertEquals(1, response.getUserId());
    }

    @Test
    public void testInsertAcc_Failure() {
        AccountEntity acc = new AccountEntity();
        when(accRepo.save(any(AccountEntity.class))).thenThrow(new RuntimeException("Failed to save account"));
        try {
            accService.insertAcc(acc);
        } catch (Exception e) {
            assertEquals("Failed to save account", e.getMessage());
        }
    }

    @Test
    public void testGetAccountByEmail() {
        // Prepare a mock AccountEntity to return
        AccountEntity mockAccount = new AccountEntity();
        mockAccount.setEmail("test@example.com");

        // Set up mock behavior for accRepo
        when(accRepo.getAccountByEmail("test@example.com")).thenReturn(mockAccount);

        // Call the service method
        AccountEntity result = accService.getAccountByEmail("test@example.com");

        // Verify that the result is not null
        assertNotNull(result);

        // Verify that the returned AccountEntity has the expected email
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testGetAccountByEmail_NotFound() {
        // Set up mock behavior for accRepo when email is not found
        when(accRepo.getAccountByEmail(anyString())).thenReturn(null);

        // Call the service method with a non-existent email
        AccountEntity result = accService.getAccountByEmail("nonexistent@example.com");

        // Verify that the result is null
        assertNull(result);
    }


}
