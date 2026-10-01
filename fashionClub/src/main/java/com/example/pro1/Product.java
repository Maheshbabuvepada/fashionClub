package com.example.pro1;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    private String productName;
    private String category;
    private String brand;
    private String size;
    private BigDecimal price;
    private String image;
    private Integer stock = 0;

    
    public Product(String productName, String category, String brand, String size,
            BigDecimal price, String image) {

        super();

        this.productName = productName;
        this.category = category;
        this.brand = brand;
        this.size = size;
        this.price = price;
        this.image = image;
    }
}