
package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.pro1.Orders;
import com.example.pro1.OrderItem;
import com.example.repository.OrderRepository;
import com.example.repository.OrderItemRepository;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(
            OrderRepository repository,
            OrderItemRepository orderItemRepository) {
        this.repository = repository;
        this.orderItemRepository = orderItemRepository;
    }

    @Transactional
    public Orders saveOrderWithItems(
            Orders order, List<OrderItem> items) {

        Orders savedOrder = repository.save(order);

        for (OrderItem item : items) {
            item.setOrderId(savedOrder.getOrderId());
            orderItemRepository.save(item);
        }

        return savedOrder;
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
