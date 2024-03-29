package com.example.springbootWithPostgresql.repository;


import com.example.springbootWithPostgresql.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdRepo extends JpaRepository<ProductEntity, Integer> {
}
