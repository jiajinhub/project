package com.example.springbootWithPostgresql.pattern.Observer;

import com.example.springbootWithPostgresql.entity.ExpiryNotify;
import com.example.springbootWithPostgresql.repository.ProdRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductExpiryNotifier implements Subject{

    @Autowired
    private List<Observer> observers = new ArrayList<>();

    @Autowired
    private EmailNotificationListener emailNotificationListener;

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(ExpiryNotify expiry) {
        for (Observer observer : observers) {
            emailNotificationListener.update(expiry);
        }
    }

    // Method to be called when a product is about to expire
    public void productAboutToExpire(ExpiryNotify expiry) {

        notifyObservers(expiry);
    }
}
