package com.example.springbootWithPostgresql.pattern.template.UpdateUserTemplate;

import org.springframework.stereotype.Component;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.repository.AccRepo;

@Component
public class UpdateTheme extends UpdateUserTemplate {
    public UpdateTheme(AccRepo accRepo) {
        super(accRepo);
    }

    @Override
    protected void updateAttributes(AccountEntity source, AccountEntity destination) {
        if (source.getHasdarktheme() != null) {
            destination.setHasdarktheme(source.getHasdarktheme());
        }
    }
}