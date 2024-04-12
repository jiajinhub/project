package com.example.springbootWithPostgresql.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class ExpiryNotify {

    @Column
    private String email;
    @Column
    private String user;
    @Column
    private String prodName;
    @Column
    private int quantity;
    @Column
    private String listName;

    public ExpiryNotify(){

    }

    public ExpiryNotify(String email, String user, String prodName, int quantity, String listName) {
        this.email = email;
        this.user = user;
        this.prodName = prodName;
        this.quantity = quantity;
        this.listName = listName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }
}
