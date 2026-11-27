
package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.pro1.Cart;
import com.example.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @PostMapping("/carts")
    public Cart saveCart(@RequestBody Cart cart) {
        return service.saveCart(cart);
    }

    @GetMapping("/carts")
    public List<Cart> getAllCarts() {
        return service.getAllCarts();
    }

    @GetMapping("/carts/customer/{customerId}")
    public List<Cart> getCustomerCart(@PathVariable Integer customerId) {
        return service.getCustomerCart(customerId);
    }

    @PutMapping("/carts/{cartId}")
    public Cart updateQuantity(
            @PathVariable Integer cartId,
            @RequestParam Integer quantity) {
        return service.updateQuantity(cartId, quantity);
    }

    @GetMapping("/carts/{cartId}")
    public Cart getCartById(@PathVariable Integer cartId) {
        return service.getCartById(cartId);
    }

    @DeleteMapping("/carts/{cartId}")
    public void deleteCart(@PathVariable Integer cartId) {
        service.deleteCart(cartId);
    }

    @DeleteMapping("/carts/customer/{customerId}")
    public void clearCustomerCart(@PathVariable Integer customerId) {
        service.clearCustomerCart(customerId);
    }
}
