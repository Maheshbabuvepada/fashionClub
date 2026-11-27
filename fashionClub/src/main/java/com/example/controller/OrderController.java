package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro1.Orders;
import com.example.pro1.OrderItem;
import com.example.service.OrderService;

@RestController
public class OrderController {

    public OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/orders")
    public Orders saveOrder(@RequestBody Orders order) {
        return service.saveOrder(order);
    }
    @PostMapping("/orders/with-items")
    public Orders saveOrderWithItems(
        @RequestBody OrderRequest request) {

    return service.saveOrderWithItems(
            request.getOrder(),
            request.getItems()
    );
    }

    @GetMapping("/orders")
    public List<Orders> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/orders/{orderId}")
    public Orders getOrderById(@PathVariable Integer orderId) {
        return service.getOrderById(orderId);
    }

    @DeleteMapping("/orders/{orderId}")
    public void deleteOrder(@PathVariable Integer orderId) {
        service.deleteOrder(orderId);
    }
    public static class OrderRequest {

    private Orders order;
    private List<OrderItem> items;

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
}
