
package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.pro1.Product;
import com.example.service.ProductService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping("/products")
    public Product saveProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/products/{productId}")
    public Product getProductById(@PathVariable Integer productId) {
        return service.getProductById(productId);
    }

    @PutMapping("/products/{productId}")
    public Product updateProduct(
            @PathVariable Integer productId,
            @RequestBody Product product) {
        return service.updateProduct(productId, product);
    }

    @DeleteMapping("/products/{productId}")
    public void deleteProduct(@PathVariable Integer productId) {
        service.deleteProduct(productId);
    }

    @GetMapping("/admin/products")
    public List<Product> getAllProductsForAdmin() {
        return service.getAllProductsForAdmin();
    }
}
