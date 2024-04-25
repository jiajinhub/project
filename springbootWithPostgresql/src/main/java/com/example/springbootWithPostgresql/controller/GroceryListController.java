package com.example.springbootWithPostgresql.controller;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;
import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import com.example.springbootWithPostgresql.pattern.command.DeleteListCommand;
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
        Map<String, Object> results = new HashMap<>();
        try {
            String accEmail = GroceryListService.getAccountByID(userID);
            List<Long> listOfListID = GroceryListService.getAllUserList(userID);
            ArrayList<Object> userLists = new ArrayList<>();
            for (long id: listOfListID) {
                Map<String, Object> currListDetail = GroceryListService.getListDetailsByID(id);
                Map<String, Object> currList = new HashMap<>();
                currList.put("list_id", currListDetail.get("list_id"));
                currList.put("name", currListDetail.get("name"));
                currList.put("description", currListDetail.get("description"));
                Integer totalProductCount = GroceryListService.getTotalProductByID(id);
                Integer totalExpiredProductCount = GroceryListService.getTotalExpiredProductByID(id);
                Integer totalExpiringProductCount = GroceryListService.getTotalExpiringProductByID(id);
                currList.put("productCount", totalProductCount);
                currList.put("expiredProductCount", totalExpiredProductCount);
                currList.put("expiringProductCount", totalExpiringProductCount);
                userLists.add(currList);
            }
            if (accEmail == null) {
                System.out.println("accEmail = null");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Map<String, Object> userData = new HashMap<>();
            userData.put("email", accEmail);
            results.put("user", userData);
            results.put("lists", userLists);
            return ResponseEntity.ok().body(results);
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
            ListDetailEntity newList = new ListDetailEntity();
            newList.setName(name);
            newList.setDescription(description);
            Long listID = ListService.saveList(newList);
            GroceryListEntity newUserList = new GroceryListEntity();
            newUserList.setUser_id(userID);
            newUserList.setList_id(listID);
            GroceryListService.saveList(newUserList);
            return new ResponseEntity<>(HttpStatus.OK);
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
            deleteListCommand.execute(userID, listID);
            return new ResponseEntity<>(HttpStatus.OK);
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
            boolean somethingWrong = ListService.updateList(listID, name, description);
            if (somethingWrong) {
                System.out.println("somethingWrong");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(HttpStatus.OK);
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
