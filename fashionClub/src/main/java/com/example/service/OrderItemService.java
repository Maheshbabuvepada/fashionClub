package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pro1.OrderItem;
import com.example.repository.OrderItemRepository;

@Service
public class OrderItemService {

    private OrderItemRepository repository;

    public OrderItemService(OrderItemRepository repository) {
        this.repository = repository;
    }

    public OrderItem saveOrderItem(OrderItem orderItem) {
       return repository.save(orderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return repository.findAll();
    }

    public OrderItem getOrderItemById(Integer orderItemId) {
        return repository.findById(orderItemId).orElse(null);
    }

    public void deleteOrderItem(Integer orderItemId) {
        repository.deleteById(orderItemId);
    }
}