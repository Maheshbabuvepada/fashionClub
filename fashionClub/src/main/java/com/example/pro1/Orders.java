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
@NoArgsConstructor
@Entity
@Table(name="orders")
public class Orders {
  
	  @Id
	  @GeneratedValue(strategy=GenerationType.IDENTITY)
	  @Column(name="order_id")
	  private Integer orderId;
	  
	  private Integer customerId;
	  
	  private Integer paymentId;
	  
	  private String orderDate;
	  
	  @Column(name="total_amount")
	  private BigDecimal totalAmount;
	  
	  private String orderStatus="pending";
	  
	  private String shippingAddress;
	  
	  private String paymentStatus="pending";

	  public Orders(Integer coustmer, String orderDate, BigDecimal totalAmount, String shippingAddress) {
		super();
		this.customerId = coustmer;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.shippingAddress = shippingAddress;
	  }

	
}
