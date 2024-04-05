package com.example.springbootWithPostgresql.pattern.strategy;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidationStrategy implements ValidationStrategy{
    public boolean validate(String value) {
        // Implement email validation logic here
        // Regular expression for email validation
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }

}
