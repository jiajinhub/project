package com.example.springbootWithPostgresql.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "product", schema = "public")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    @Column
    private String name;

    @Column
    private Date expiryDate;

    @Column
    private int listId;

    @Column
    private int quantity;

    @Column
    private String nutriGrade;

    @Column
    private String description;

    @Column
    private String price;

    @Column
    private String category;

   public ProductEntity(Long productId, String name, Date expiryDate, int listId, int quantity, String nutriGrade, String description, String price, String category) {
        this.productId = productId;
        this.name = name;
        this.expiryDate = expiryDate;
        this.listId = listId;
        this.quantity = quantity;
        this.nutriGrade = nutriGrade;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    public ProductEntity(){

    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getNutriGrade() {
        return nutriGrade;
    }

    public void setNutriGrade(String nutriGrade) {
        this.nutriGrade = nutriGrade;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "ProductEntity{" +
                "productId=" + productId +
                ", name='" + name + '\'' +
                ", expiryDate=" + expiryDate +
                ", listId=" + listId +
                '}';
    }
}
