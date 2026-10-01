package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Cart;
import com.example.repository.CartRepository;

@Service
public class CartService {

    private CartRepository repository;

    public CartService(CartRepository repository) {
        this.repository = repository;
    }

    public Cart saveCart(Cart cart) {
        return repository.save(cart);
    }

    public List<Cart> getAllCarts() {
        return repository.findAll();
    }

    public Cart getCartById(Integer cartId) {
        return repository.findById(cartId).orElse(null);
    }

    public void deleteCart(Integer cartId) {
        repository.deleteById(cartId);
    }
}