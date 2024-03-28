package com.example.springbootWithPostgresql.service.impl;

import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import com.example.springbootWithPostgresql.repository.ListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListServiceImpl {

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
}
