package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pro1.Product;

public interface ProductRepository extends JpaRepository<Product , Integer>{

	
}
