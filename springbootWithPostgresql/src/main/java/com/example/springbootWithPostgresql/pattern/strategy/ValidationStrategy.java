package com.example.springbootWithPostgresql.pattern.strategy;

public interface ValidationStrategy {
    boolean validate(String value);
}
