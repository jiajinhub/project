package com.example.springbootWithPostgresql.pattern.UpdateUserTemplate;

import com.example.springbootWithPostgresql.entity.AccountEntity;
import com.example.springbootWithPostgresql.repository.AccRepo;
import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public abstract class UpdateUserTemplate {
    protected AccRepo accRepo;

    public UpdateUserTemplate(AccRepo accRepo) {
        this.accRepo = accRepo;
    }

    public final AccountEntity updateUser(AccountEntity user) {
        Optional<AccountEntity> userDetailOpt = accRepo.findById(user.getUserId());
        if (userDetailOpt.isPresent()) {
            AccountEntity userDetail = userDetailOpt.get();
            updateAttributes(user, userDetail); // Template method
            return accRepo.save(userDetail);
        } else {
            throw new RuntimeException("User not found.");
        }
    }

    protected abstract void updateAttributes(AccountEntity source, AccountEntity destination);
}

