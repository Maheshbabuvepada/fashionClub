
package com.example.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.pro1.Product;
import com.example.pro1.ProductSize;
import com.example.repository.ProductRepository;
import com.example.repository.ProductSizeRepository;

@Service
public class ProductSizeService {

    private final ProductSizeRepository sizeRepository;
    private final ProductRepository productRepository;

    public ProductSizeService(
            ProductSizeRepository sizeRepository,
            ProductRepository productRepository) {

        this.sizeRepository = sizeRepository;
        this.productRepository = productRepository;
    }

    public List<ProductSize> getAllSizes() {
        return sizeRepository.findAll();
    }

    public List<ProductSize> getSizesByProduct(Integer productId) {
        return sizeRepository.findByProductProductId(productId);
    }

    public ProductSize addSize(Integer productId, String size, Integer stock) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found"));

        ProductSize productSize = new ProductSize();

        productSize.setProduct(product);
        productSize.setSize(size);
        productSize.setStock(stock);

        return sizeRepository.save(productSize);
    }

    public ProductSize updateStock(Integer id, Integer stock) {

        ProductSize productSize = sizeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product size not found"));

        productSize.setStock(stock);

        return sizeRepository.save(productSize);
    }

    public void deleteSize(Integer id) {
        sizeRepository.deleteById(id);
    }
}
