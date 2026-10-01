package com.example.pro1;

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
@Table(name="feedback")
@NoArgsConstructor
public class Feedback {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer feedbackId;
	private Integer customerId;
	private String message;
	private String messageDate;
	private Integer rating;
	
	
	public Feedback(Integer customerId, String message, String messageDate, Integer rating) {
		super();
		this.customerId = customerId;
		this.message = message;
		this.messageDate = messageDate;
		this.rating = rating;
	}
	
	
}
