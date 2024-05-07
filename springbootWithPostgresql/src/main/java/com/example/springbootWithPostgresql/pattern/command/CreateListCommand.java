package com.example.springbootWithPostgresql.pattern.command;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;
import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class CreateListCommand implements GroceryListCommand{

    private final GroceryListService groceryListService;
    private final ListService listService;

    public CreateListCommand(GroceryListService groceryListService, ListService listService) {
        this.groceryListService = groceryListService;
        this.listService = listService;
    }

    @Override
    public ResponseEntity<Map<String, Object>> execute(HashMap<String, Object> requestParams) throws Exception {
        ListDetailEntity newList = createList((String) requestParams.get("name"), (String) requestParams.get("description"));
        Long listID = listService.saveList(newList);
        GroceryListEntity newUserList = createUserList((Long) requestParams.get("userID"), listID);
        groceryListService.saveList(newUserList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private ListDetailEntity createList(String name, String description) {
        ListDetailEntity newList = new ListDetailEntity();
        newList.setName(name);
        newList.setDescription(description);
        return newList;
    }

    private GroceryListEntity createUserList(Long userID, Long listID) {
        GroceryListEntity newUserList = new GroceryListEntity();
        newUserList.setUser_id(userID);
        newUserList.setList_id(listID);
        return newUserList;
    }
}
