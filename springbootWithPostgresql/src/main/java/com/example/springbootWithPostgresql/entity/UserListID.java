package com.example.springbootWithPostgresql.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

public class UserListID implements Serializable {
    private Long user_id;
    private Long list_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserListID that = (UserListID) o;
        return user_id.equals(that.user_id) && list_id.equals(that.list_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, list_id);
    }
}
