package com.example.springbootWithPostgresql.pattern.command;

import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class UpdateListCommand implements GroceryListCommand{
    private final ListService listService;

    public UpdateListCommand(ListService listService) {
        this.listService = listService;
    }

    @Override
    public ResponseEntity<Map<String, Object>> execute(HashMap<String, Object> requestParams) throws Exception {
        listService.updateList((Long) requestParams.get("listID"), (String) requestParams.get("name"), (String) requestParams.get("description"));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
