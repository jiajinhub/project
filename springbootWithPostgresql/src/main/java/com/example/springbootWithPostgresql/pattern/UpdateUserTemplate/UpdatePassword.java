package com.example.springbootWithPostgresql.pattern.UpdateUserTemplate;

import org.springframework.stereotype.Component;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.repository.AccRepo;

@Component
public class UpdatePassword extends UpdateUserTemplate {
    public UpdatePassword(AccRepo accRepo) {
        super(accRepo);
    }

    @Override
    protected void updateAttributes(AccountEntity source, AccountEntity destination) {
        if (!source.getPassword().isEmpty()) {
            destination.setPassword(source.getPassword());
        }
    }
}