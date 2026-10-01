package com.example.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.pro1.Product;
import com.example.service.ProductService;



@RestController
public class ProductController {

	public ProductService service;
	
	public ProductController(ProductService service) {
		this.service = service;
	}
	
	@PostMapping("/products")
	public Product saveProduct(@RequestBody Product product) {
		return service.saveProduct(product);
	}
	
	@GetMapping("/products")
	public List<Product> getAllProducts(){
		return service.getAllProducts();
	}
	
	@GetMapping("/products{ProductId}")
		public Product getProductById(@PathVariable Integer productId) {
		return service.getProductById(productId);
	}
	
	@DeleteMapping("/products/{productId}")
	public void deleteProduct(@PathVariable Integer productId){
		service.deleteProduct(productId);
	}
}
