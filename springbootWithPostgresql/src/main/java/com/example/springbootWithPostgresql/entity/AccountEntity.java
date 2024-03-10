package com.example.springbootWithPostgresql.entity;


import javax.persistence.*;
import java.util.Objects;

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

    // to help with test cases and comparing same records
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccountEntity that = (AccountEntity) o;
        return Objects.equals(userId, that.userId) && Objects.equals(email, that.email) && Objects.equals(password, that.password);
    }

    // to help with test cases and comparing same records
    @Override
    public int hashCode() {
        return Objects.hash(userId, email, password);
    }

}
