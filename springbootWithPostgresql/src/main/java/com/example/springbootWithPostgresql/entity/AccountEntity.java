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

    @Column
    private Boolean hasdarktheme;

    public AccountEntity(Long id, String name, String password, Boolean hasdarktheme) {
        this.userId = id;
        this.email = name;
        this.password = password;
        this.hasdarktheme = hasdarktheme;
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

    public Boolean getHasdarktheme() {
        return hasdarktheme;
    }

    public void setHasdarktheme(Boolean hasdarktheme) {
        this.hasdarktheme = hasdarktheme;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccountEntity account = (AccountEntity) o;
        return Objects.equals(userId, account.userId) && Objects.equals(email, account.email) && Objects.equals(password, account.password) && Objects.equals(hasdarktheme, account.hasdarktheme);
    }

    @Override
    public String toString() {
        return "AccountEntity{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", hasdarktheme=" + hasdarktheme +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, email, password, hasdarktheme);
    }
}
