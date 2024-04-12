package com.example.springbootWithPostgresql.pattern.Observer;

import com.example.springbootWithPostgresql.entity.ExpiryNotify;

public interface Subject {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers(ExpiryNotify expiry);
}
