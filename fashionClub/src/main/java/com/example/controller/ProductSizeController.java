
package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.pro1.ProductSize;
import com.example.service.ProductSizeService;

@RestController
@RequestMapping("/product-sizes")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductSizeController {

    private final ProductSizeService service;

    public ProductSizeController(ProductSizeService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductSize> getAllSizes() {
        return service.getAllSizes();
    }

    @GetMapping("/product/{productId}")
    public List<ProductSize> getSizesByProduct(
            @PathVariable Integer productId) {
        return service.getSizesByProduct(productId);
    }

    @PostMapping
    public ProductSize addSize(
            @RequestParam Integer productId,
            @RequestParam String size,
            @RequestParam Integer stock) {

        return service.addSize(productId, size, stock);
    }

    @PutMapping("/{id}")
    public ProductSize updateStock(
            @PathVariable Integer id,
            @RequestParam Integer stock) {

        return service.updateStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public String deleteSize(@PathVariable Integer id) {
        service.deleteSize(id);
        return "Product size deleted successfully";
    }
}
