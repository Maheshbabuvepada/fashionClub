package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.CartInformation;
import com.example.repository.CartInformationRepository;

@Service
public class CartInformationService {

	public CartInformationRepository repository;
	
	public CartInformationService(CartInformationRepository repository) {
		this.repository=repository;
	}
	
	public CartInformation saveCartInformation(CartInformation cartInformation) {
		return repository.save(cartInformation);
	}
	
	public List<CartInformation> getAllCartInformation() {
		return repository.findAll();
	}
	
	public CartInformation getCartInformationById(Integer CartInfromationID) {
		return repository.findById(CartInfromationID).orElse(null);
	}
	
	public void deleteCartInformation(Integer CartInfromationId) {
		repository.deleteById(CartInfromationId);
	}
}
