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

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    
    private Integer cartId;

    private Integer customerId;

    private Integer productId;
    
    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal totalPrice;

    private String addedDate;

	public Cart(Integer customer, Integer product, Integer quantity, BigDecimal unitPrice,
			BigDecimal totalPrice, String addedDate) {
		super();
		this.customerId = customer;
		this.productId = product;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
		this.totalPrice = totalPrice;
		this.addedDate = addedDate;
	}

	 
}
