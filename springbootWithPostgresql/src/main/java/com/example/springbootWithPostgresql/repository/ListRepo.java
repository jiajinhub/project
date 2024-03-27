package com.example.springbootWithPostgresql.repository;

import com.example.springbootWithPostgresql.entity.ListDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ListRepo extends JpaRepository<ListDetailEntity, Long> {

    @Query(value = "select count(1) from list", nativeQuery = true)
    int getCount();

    @Query(value = "select list_id, name, description from list where list_id = ?1", nativeQuery = true)
    ListDetailEntity getListDetailsByID(Long id);
}
