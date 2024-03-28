package com.example.springbootWithPostgresql.entity;

import javax.persistence.*;

@Entity
@Table(name = "list", schema = "public")
public class ListDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long list_id;

    @Column
    private String name;

    @Column
    private String description;

    public Long getListId() {
        return list_id;
    }
    public String getListName() {
        return name;
    }
    public String getListDescription() {
        return description;
    }

    public void setList_id(Long list_id) {
        this.list_id = list_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
