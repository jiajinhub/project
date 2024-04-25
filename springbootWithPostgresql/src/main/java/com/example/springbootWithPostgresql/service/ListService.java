package com.example.springbootWithPostgresql.service;

import com.example.springbootWithPostgresql.entity.ListDetailEntity;

import java.util.Optional;

public interface ListService {
    public Long saveList(ListDetailEntity list);

    public ListDetailEntity getListDetailsByID(Long listID);

    public void deleteList (Long listID);

    public boolean updateList (Long listID, String name, String description);
}
