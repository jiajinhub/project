package com.example.springbootWithPostgresql.pattern.strategy;

public class PasswordValidationStrategy implements ValidationStrategy {
    public boolean validate(String value) {
        // Check if the password is at least 8 characters long
        return value != null && value.length() >= 8;
    }
}
