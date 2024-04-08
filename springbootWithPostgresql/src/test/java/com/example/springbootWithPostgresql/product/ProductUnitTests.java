package com.example.springbootWithPostgresql.product;

import com.example.springbootWithPostgresql.entity.ProductEntity;
import com.example.springbootWithPostgresql.repository.ProdRepo;
import com.example.springbootWithPostgresql.service.impl.ProdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ProductUnitTests {

    @Autowired
    private ProdService prodService;

    @Test
    void presentID() {
        ProductEntity item = prodService.getProdById(1L);
        assertEquals(item.getProductId(), 1L);
    }


}
