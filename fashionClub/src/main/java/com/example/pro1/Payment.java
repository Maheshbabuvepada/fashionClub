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
@Table(name="payment")
public class Payment {
	
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="payment_id")
	private Integer paymentId;
    
	private Integer orderId;
	private String paymentMethod;
	private BigDecimal paymentAmount;
	
	@Column(name = "payment_status")
	private String paymentStatus = "pending";
	
	private Integer transactionId;
	private String paymentdate;
	
	public Payment(Integer order, String paymentMethod, BigDecimal paymentAmount, Integer transactionId, String paymentdate) {
		super();
		this.orderId = order;
		this.paymentMethod = paymentMethod;
		this.paymentAmount = paymentAmount;
		this.transactionId = transactionId;
		this.paymentdate = paymentdate;
	}
	
	
	
}
