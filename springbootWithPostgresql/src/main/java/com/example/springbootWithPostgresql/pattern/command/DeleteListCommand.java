package com.example.springbootWithPostgresql.pattern.command;

import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;

public class DeleteListCommand implements GroceryListCommand{
    private final GroceryListService groceryListService;
    private final ListService listService;

    public DeleteListCommand(GroceryListService groceryListService, ListService listService) {
        this.groceryListService = groceryListService;
        this.listService = listService;
    }

    @Override
    public void execute(Long userID, Long listID) throws Exception {
        groceryListService.deleteUserList(userID, listID);
        listService.deleteList(listID);
    }
}
