package com.example.springbootWithPostgresql.pattern.command;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public interface GroceryListCommand {
    ResponseEntity<Map<String, Object>> execute(HashMap<String, Object> requestParams) throws Exception;

}
