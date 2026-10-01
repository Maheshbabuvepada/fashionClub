package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Payment;
import com.example.service.PaymentService;

@RestController
public class PaymentController {
  
	public PaymentService service;
	
	public PaymentController(PaymentService service) {
		this.service=service;
	}
	
	@PostMapping("/payments")
	public Payment savePayment(@RequestBody Payment payment) {
		return service.savePayment(payment);
	}
	
	@GetMapping("/payments")
	public List<Payment> getAllpayments() {
		return service.getAllPayments();
	}
	
	@GetMapping("/payments/{paymentId}")
	public Payment getPaymentById(@PathVariable Integer paymentId) {
		return service.getPaymentById(paymentId);
	}
	
	@DeleteMapping("/payments/{paymentId}")
	public void deletePayment(@PathVariable Integer paymentId) {
		service.deletePaymentId(paymentId);
	}
}
