package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Payment;
import com.example.repository.PaymentRepository;

@Service
public class PaymentService {
     
	 public PaymentRepository repository;
	
	  public PaymentService(PaymentRepository repository) {
		  this.repository=repository;
	  }
	  
	  public Payment savePayment(Payment payment) {
		 return repository.save(payment);
	  }
	  
	  public List<Payment> getAllPayments(){
		  return repository.findAll();
	  }
	  
	  public Payment getPaymentById(Integer paymentId) {
		  return repository.findById(paymentId).orElse(null);
	  }
	  
	  public void deletePaymentId(Integer paymentId) {
		  repository.deleteById(paymentId);
	  }
}
