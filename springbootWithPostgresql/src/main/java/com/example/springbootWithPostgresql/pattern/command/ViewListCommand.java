package com.example.springbootWithPostgresql.pattern.command;

import com.example.springbootWithPostgresql.entity.GroceryListEntity;
import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ViewListCommand implements GroceryListCommand{
    private final GroceryListService groceryListService;

    public ViewListCommand(GroceryListService groceryListService) {
        this.groceryListService = groceryListService;
    }

    @Override
    public ResponseEntity<Map<String, Object>> execute(HashMap<String, Object> requestParams) throws Exception {
        List<Long> listOfListID = groceryListService.getAllUserList((Long) requestParams.get("userID"));
        Map<String, Object> results = new HashMap<>();
        results.put("user", getUserData((Long) requestParams.get("userID")));
        results.put("lists", getUserLists(listOfListID));
        return ResponseEntity.ok().body(results);
    }

    private Map<String, Object> getUserData(Long userID) throws Exception{
        String accEmail = groceryListService.getAccountByID(userID);
        if (accEmail == null) {
            System.out.println("accEmail = null");
            throw new Exception();
        }
        Map<String, Object> userData = new HashMap<>();
        userData.put("email", accEmail);
        return userData;
    }

    private ArrayList<Object> getUserLists(List<Long> listOfListID) throws Exception{
        ArrayList<Object> userLists = new ArrayList<>();
        for (long id: listOfListID) {
            Map<String, Object> currListDetail = groceryListService.getListDetailsByID(id);
            Map<String, Object> currList = new HashMap<>();
            currList.put("list_id", currListDetail.get("list_id"));
            currList.put("name", currListDetail.get("name"));
            currList.put("description", currListDetail.get("description"));
            Integer totalProductCount = groceryListService.getTotalProductByID(id);
            Integer totalExpiredProductCount = groceryListService.getTotalExpiredProductByID(id);
            Integer totalExpiringProductCount = groceryListService.getTotalExpiringProductByID(id);
            currList.put("productCount", totalProductCount);
            currList.put("expiredProductCount", totalExpiredProductCount);
            currList.put("expiringProductCount", totalExpiringProductCount);
            userLists.add(currList);
        }
        return userLists;
    }
}
