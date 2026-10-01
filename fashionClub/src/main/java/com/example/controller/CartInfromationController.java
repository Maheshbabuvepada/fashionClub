package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.CartInformation;
import com.example.service.CartInformationService;

@RestController
public class CartInfromationController {

	public CartInformationService service;
	
	public CartInfromationController(CartInformationService service) {
		this.service=service;
	}
	
	@PostMapping("/cartInformation")
	public CartInformation saveCartInfromation(@RequestBody CartInformation cartInfromation) {
		return service.saveCartInformation(cartInfromation);
	}
	
	@GetMapping("/cartInformation")
	public List<CartInformation> gelAllCartInformation() {
		return service.getAllCartInformation();
	}
	
	@GetMapping("/cartInformation/{cartInformationId}")
    public CartInformation getCartById(@PathVariable Integer cartInformationId) {
        return service.getCartInformationById(cartInformationId);
    }
	
	 @DeleteMapping("/cartInformation/{cartInformationId}")
	 public void deleteCart(@PathVariable Integer cartInformationId) {
	        service.deleteCartInformation(cartInformationId);
	    }
}
