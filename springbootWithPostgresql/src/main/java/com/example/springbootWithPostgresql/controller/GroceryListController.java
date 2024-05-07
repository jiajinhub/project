package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;
import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import com.example.springbootWithPostgresql.pattern.command.CreateListCommand;
import com.example.springbootWithPostgresql.pattern.command.DeleteListCommand;
import com.example.springbootWithPostgresql.pattern.command.UpdateListCommand;
import com.example.springbootWithPostgresql.pattern.command.ViewListCommand;
import com.example.springbootWithPostgresql.service.impl.GroceryListImpl;
import com.example.springbootWithPostgresql.service.impl.ListServiceImpl;
import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:9000", "http://localhost:9001"})
@RequestMapping("/dashboard")
public class GroceryListController {

    @Autowired
    GroceryListImpl GroceryListService;

    @Autowired
    ListServiceImpl ListService;

    @Autowired
    private GroceryListService groceryListService;

    @Autowired
    private ListService listService;

    @RequestMapping("/getUserLists")
    public ResponseEntity<Map<String, Object>> getAllList(@RequestParam("userID") Long userID) {
        try {
            ViewListCommand viewListCommand = new ViewListCommand(groceryListService);
            HashMap<String, Object> requestParams = new HashMap<>();
            requestParams.put("userID", userID);
            return viewListCommand.execute(requestParams);
        } catch (Exception e) {
            System.out.println("Dashboard GetUserLists Error: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping ("/addList")
    public ResponseEntity<Map<String, Object>> addList(
            @RequestParam("userID") Long userID,
            @RequestParam("name") String name,
            @RequestParam("description") String description
    ) {
        try {
            CreateListCommand createListCommand = new CreateListCommand(groceryListService, listService);
            HashMap<String, Object> requestParams = new HashMap<>();
            requestParams.put("userID", userID);
            requestParams.put("name", name);
            requestParams.put("description", description);
            return createListCommand.execute(requestParams);
        } catch (Exception e) {
            System.out.println("Dashboard addList Error: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/deleteUserList")
    public ResponseEntity<Map<String, Object>> deleteUserList (
            @RequestParam("userID") Long userID,
            @RequestParam("listID") Long listID
    ) {
        try {
            DeleteListCommand deleteListCommand = new DeleteListCommand(groceryListService, listService);
            HashMap<String, Object> requestParams = new HashMap<>();
            requestParams.put("userID", userID);
            requestParams.put("listID", listID);
            return deleteListCommand.execute(requestParams);
        } catch (Exception e) {
            System.out.println("Dashboard deleteUserList Error: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/updateList")
    public ResponseEntity<Map<String,Object>> updateList (
            @RequestParam("listID") Long listID,
            @RequestParam("name") String name,
            @RequestParam("description") String description
    ) {
        try {
            UpdateListCommand updateListCommand = new UpdateListCommand(listService);
            HashMap<String, Object> requestParams = new HashMap<>();
            requestParams.put("listID", listID);
            requestParams.put("name", name);
            requestParams.put("description", description);
            return updateListCommand.execute(requestParams);
        } catch (Exception e) {
            System.out.println("Dashboard updateList Error: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/retrieveList")
    public Map<String, Object> getList(@RequestBody Map<String, Long> map){
        return GroceryListService.getListDetailsByID(map.get("list_id"));
    }

}
