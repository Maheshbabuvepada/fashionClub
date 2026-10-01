package com.example.pro1;

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
@Table(name="cart_information")
public class CartInformation {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "cart_information_id")
	private Integer cartInformationId;
	private Integer cartId;
	private Integer productId;
	private Integer customerId;
	private String  dateOfCreation;
	private String dateOfUpdation;
	private boolean status;
	
	public CartInformation(Integer cartId, Integer productId, Integer customerId, String dateOfCreation,
			String dateOfUpdation, boolean status) {
		super();
		this.cartId = cartId;
		this.productId = productId;
		this.customerId = customerId;
		this.dateOfCreation = dateOfCreation;
		this.dateOfUpdation = dateOfUpdation;
		this.status = status;
	}
	
	
	
	
}
