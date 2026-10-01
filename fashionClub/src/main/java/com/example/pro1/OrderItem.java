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
@Table(name="order_item")
public class OrderItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="order_item_id")
	private Integer orderItemId;
	
	private Integer orderId;
	
	private Integer productId;
	
	private Integer quantity;
	
	private BigDecimal unitPrice;
	
	private BigDecimal subTotal;
	
	public OrderItem(Integer order, Integer product, Integer quantity, BigDecimal unitPrice, BigDecimal subTotal) {
		super();
		this.orderId = order;
		this.productId = product;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
		this.subTotal = subTotal;
	}
	
	
}
