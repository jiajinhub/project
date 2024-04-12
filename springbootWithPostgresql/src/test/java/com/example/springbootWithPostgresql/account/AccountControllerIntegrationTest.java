package com.example.springbootWithPostgresql.account;

import com.example.springbootWithPostgresql.controller.AccountController;
import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.entity.AccountRequestEntity;
import com.example.springbootWithPostgresql.pattern.strategy.ResponseMessage;
import com.example.springbootWithPostgresql.service.impl.AccServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@WebMvcTest(AccountController.class)
@ExtendWith(SpringExtension.class)
public class AccountControllerIntegrationTest {

    @MockBean
    private AccServiceImpl accService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AccountController accountController;


    @Test
    public void testInsertAccount_ValidInput() throws Exception {
        String requestJson = "{\"email\": \"valid@example.com\", \"password\": \"validpassword\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/account/insertAccount")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Account created successfully."));
    }

    @Test
    public void testInsertAccount_InvalidInput() throws Exception {
        String requestJson = "{\"email\": \"invalid_email\", \"password\": \"short\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/account/insertAccount")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Invalid password. Password must be at least 8 characters long."));

    }

    @Test
    void testGetAllAccountSuccess() throws Exception { //remove last dun need
        // Fake some users for testing
        AccountEntity user1 = new AccountEntity();
        user1.setUserId(1L);
        user1.setEmail("valid@example.com");
        user1.setPassword("longpassword");
        user1.setHasdarktheme(true);

        AccountEntity user2 = new AccountEntity();
        user2.setUserId(2L);
        user2.setEmail("valid2@example.com");
        user2.setPassword("longpassword2");
        user2.setHasdarktheme(false);

        // Create a list of fake users
        List<AccountEntity> mockUsers = Arrays.asList(user1, user2);

        // Mock the behavior of your service
        when(accService.getAllUser()).thenReturn(mockUsers);

        // Perform the request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/account/retrieve")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(mockUsers.size()));
    }

    @Test
    void testGetAllAccountFailure() throws Exception {//remove last dun need
        // Perform the request with invalid JSON data
        mockMvc.perform(MockMvcRequestBuilders.get("/account/retrieve")
                        .content("Something went wrong"))  // Send invalid JSON data
                        //.contentType(MediaType.APPLICATION_JSON)) // Set content type to JSON
                // Verify that the response status is 400 (Bad Request)
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    public void testGetAccById_Success() throws Exception {
        // Arrange
        Long validUserId = 123L;
        AccountEntity mockAccount = new AccountEntity();
        when(accService.getUserById(validUserId)).thenReturn(mockAccount);

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/account/retrieveById")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userID\": 123}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").exists());
    }

    @Test
    public void testGetAccById_Failure() throws Exception {
        // Arrange
        Long invalidUserId = 456L;
        when(accService.getUserById(invalidUserId)).thenReturn(null);

        // Act and Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/account/retrieveById")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("no matching id"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void updatePassword_Success() {
        // Given
        AccountEntity user = new AccountEntity();
        user.setEmail("valid2@example.com");
        user.setPassword("newPassword123");

        // Mocking the service response
        when(accService.updatePassword(any())).thenReturn(user);

        // When
        AccountEntity updatedUser = accountController.updatePassword(user);

        // Then
        assertNotNull(updatedUser);
        assertEquals("valid2@example.com", updatedUser.getEmail());
        assertEquals("newPassword123", updatedUser.getPassword());

        // Verify that the service method was called once
        verify(accService, times(1)).updatePassword(any());
    }

    @Test
    void testAuthorizeSuccess() {
        // Mock input data
        AccountRequestEntity requestEntity = new AccountRequestEntity();
        requestEntity.setEmail("test@example.com");
        requestEntity.setPassword("password");

        AccountEntity mockAccount = new AccountEntity();
        mockAccount.setEmail("test@example.com");
        mockAccount.setPassword("password");

        // Mock service method
        when(accService.getAccountByEmail("test@example.com")).thenReturn(mockAccount);

        // Test method
        ResponseEntity<AccountEntity> responseEntity = accountController.authorize(requestEntity);

        // Verify the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockAccount, responseEntity.getBody());
    }

    @Test
    void testAuthorizeFailure() {
        // Mock input data
        AccountRequestEntity requestEntity = new AccountRequestEntity();
        requestEntity.setEmail("test@example.com");
        requestEntity.setPassword("wrong_password");

        // Mock service method
        when(accService.getAccountByEmail("test@example.com")).thenReturn(null);

        // Test method
        ResponseEntity<AccountEntity> responseEntity = accountController.authorize(requestEntity);

        // Verify the result
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }


}
