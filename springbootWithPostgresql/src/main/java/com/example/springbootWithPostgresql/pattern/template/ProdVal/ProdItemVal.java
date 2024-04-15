package com.example.springbootWithPostgresql.pattern.template.ProdVal;

import org.springframework.stereotype.Service;
import com.example.springbootWithPostgresql.service.impl.ProdService;
import com.example.springbootWithPostgresql.entity.ProductEntity;

@Service
public class ProdItemVal extends ProdService {
    @Override
    protected void validateProd(ProductEntity prod) {
        if (prod == null) {
            throw new IllegalArgumentException("Item cannot be empty");
        }
        if (prod.getName() == null || prod.getCategory() == null || prod.getPrice() == null ||prod.getExpiryDate() == null) {
            throw new IllegalArgumentException("Fields cannot be empty");
        }
    }
}
