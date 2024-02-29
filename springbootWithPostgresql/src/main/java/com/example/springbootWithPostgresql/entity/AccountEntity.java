package com.example.springbootWithPostgresql.entity;


import javax.persistence.*;

@Entity
@Table(name = "account", schema = "public")
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column
    private String email;

    @Column
    private String password;

    public AccountEntity(Long id, String name, String password) {
        this.userId = id;
        this.email = name;
        this.password = password;
    }

    public AccountEntity() {

    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
