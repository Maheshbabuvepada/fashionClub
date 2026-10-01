package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.Orders;
import com.example.repository.OrderRepository;

@Service
public class OrderService {

    private OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Orders saveOrder(Orders order) {
        return repository.save(order);
    }

    public List<Orders> getAllOrders() {
        return repository.findAll();
    }

    public Orders getOrderById(Integer orderId) {
        return repository.findById(orderId).orElse(null);
    }

    public void deleteOrder(Integer orderId) {
        repository.deleteById(orderId);
    }
}