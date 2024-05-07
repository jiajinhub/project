package com.example.springbootWithPostgresql.service.impl;

import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import com.example.springbootWithPostgresql.repository.ListRepo;
import com.example.springbootWithPostgresql.service.GroceryListService;
import com.example.springbootWithPostgresql.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ListServiceImpl implements ListService {

    @Autowired
    private ListRepo listRepo;

    public Long saveList(ListDetailEntity list) {
        ListDetailEntity listDetail = listRepo.save(list);
        return listDetail.getListId();
    }

    public ListDetailEntity getListDetailsByID(Long listID) {
        return listRepo.getListDetailsByID(listID);
    }

    public void deleteList (Long listID) {
        listRepo.deleteById(listID);
    }

    public void updateList (Long listID, String name, String description) throws Exception{
        Optional<ListDetailEntity> toUpdate = listRepo.findById(listID);
        if (toUpdate.isEmpty()) {
            throw new Exception();
        }
        ListDetailEntity toUpdateList = toUpdate.get();
        toUpdateList.setName(name);
        toUpdateList.setDescription(description);
        listRepo.save(toUpdateList);
    }
}
