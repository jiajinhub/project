package com.example.springbootWithPostgresql.entity;

import javax.persistence.*;

@Entity
@IdClass(UserListID.class)
@Table(name = "userlist", schema = "public")
public class GroceryListEntity {
    @Id
    private Long user_id;

    @Id
    private Long list_id;

    public Long getListId() {
        return list_id;
    }

    public Long getUserId() {
        return user_id;
    }

    public void setList_id(Long list_id) {
        this.list_id = list_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
