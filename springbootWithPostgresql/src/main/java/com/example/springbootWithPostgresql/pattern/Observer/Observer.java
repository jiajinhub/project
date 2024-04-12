package com.example.springbootWithPostgresql.pattern.Observer;

import com.example.springbootWithPostgresql.entity.ExpiryNotify;

public interface Observer {
    void update(ExpiryNotify expiry);
}
