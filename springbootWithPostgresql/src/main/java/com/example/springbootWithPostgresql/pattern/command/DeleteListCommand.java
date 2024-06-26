package com.example.springbootWithPostgresql.pattern.command;

import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class DeleteListCommand implements GroceryListCommand{
    private final GroceryListService groceryListService;
    private final ListService listService;

    public DeleteListCommand(GroceryListService groceryListService, ListService listService) {
        this.groceryListService = groceryListService;
        this.listService = listService;
    }

    @Override
    public ResponseEntity<Map<String, Object>> execute(HashMap<String, Object> requestParams) throws Exception {
        groceryListService.deleteUserList((Long) requestParams.get("userID"), (Long) requestParams.get("listID"));
        listService.deleteList((Long) requestParams.get("listID"));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
