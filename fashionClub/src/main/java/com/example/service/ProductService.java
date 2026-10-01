package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Product;
import com.example.repository.ProductRepository;

@Service
public class ProductService {

	   private ProductRepository repository;
	   
	   public ProductService(ProductRepository repository) {
		   this.repository = repository;
	   }
	   
	   public Product saveProduct(Product product) {
		  return repository.save(product);
	   }
	   
	   public List<Product> getAllProducts(){
		   return repository.findAll();
	   }
	   
	   public Product getProductById(Integer productId) {
		   return repository.findById(productId).orElse(null);
	   }
	   
	   public void deleteProduct(Integer productId) {
		    repository.deleteById(productId);
		}
}
