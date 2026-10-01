package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Cart;
import com.example.service.CartService;

@RestController
public class CartController {

    public CartService service;

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

    @GetMapping("/carts/{cartId}")
    public Cart getCartById(@PathVariable Integer cartId) {
        return service.getCartById(cartId);
    }

    @DeleteMapping("/carts/{cartId}")
    public void deleteCart(@PathVariable Integer cartId) {
        service.deleteCart(cartId);
    }
}