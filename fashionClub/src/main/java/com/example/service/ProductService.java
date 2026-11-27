
package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.pro1.Product;
import com.example.repository.ProductRepository;
import com.example.repository.ProductSizeRepository;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final ProductSizeRepository sizeRepository;

    public ProductService(
            ProductRepository repository,
            ProductSizeRepository sizeRepository) {
        this.repository = repository;
        this.sizeRepository = sizeRepository;
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public List<Product> getAllProducts() {
        return repository.findByIsActiveTrue();
    }

    public List<Product> getAllProductsForAdmin() {
        return repository.findAll();
    }

    public Product getProductById(Integer productId) {
        return repository.findById(productId).orElse(null);
    }

    public Product updateProduct(Integer productId, Product updatedProduct) {

        Product product = repository.findById(productId).orElse(null);

        if (product == null) {
            return null;
        }

        product.setProductName(updatedProduct.getProductName());
        product.setCategory(updatedProduct.getCategory());
        product.setBrand(updatedProduct.getBrand());
        product.setPrice(updatedProduct.getPrice());
        product.setImage(updatedProduct.getImage());

        return repository.save(product);
    }

    @Transactional
    public void deleteProduct(Integer productId) {

        Product product = repository.findById(productId)
                .orElseThrow(() ->
                    new RuntimeException("Product not found"));

        sizeRepository.deleteByProductProductId(productId);

        repository.delete(product);
    }
}
