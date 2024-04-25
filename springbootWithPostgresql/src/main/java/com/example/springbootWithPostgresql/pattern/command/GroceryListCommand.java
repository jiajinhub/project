package com.example.springbootWithPostgresql.pattern.command;

public interface GroceryListCommand {
    void execute(Long userID, Long listID) throws Exception;
}
