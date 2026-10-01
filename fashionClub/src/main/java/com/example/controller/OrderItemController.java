package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.OrderItem;
import com.example.service.OrderItemService;

@RestController
public class OrderItemController {

    public OrderItemService service;

    public OrderItemController(OrderItemService service) {
        this.service = service;
    }

    @PostMapping("/order-items")
    public OrderItem saveOrderItem(@RequestBody OrderItem orderItem) {
       return service.saveOrderItem(orderItem);
    }

    @GetMapping("/order-items")
    public List<OrderItem> getAllOrderItems() {
        return service.getAllOrderItems();
    }

    @GetMapping("/order-items/{orderItemId}")
    public OrderItem getOrderItemById(@PathVariable Integer orderItemId) {
        return service.getOrderItemById(orderItemId);
    }

    @DeleteMapping("/order-items/{orderItemId}")
    public void deleteOrderItem(@PathVariable Integer orderItemId) {
        service.deleteOrderItem(orderItemId);
    }
}